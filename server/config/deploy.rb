# config/deploy.rb
lock '3.4.0'
set :application, 'dashboard'
set :repo_url, 'git@github.com:happyfreemo69/dashboard.git'

set :branch, 'master'
set :scm, :git
set :format, :pretty
set :log_level, :debug
set :node_env, (fetch(:node_env) || fetch(:stage))

set :linked_files, %w{server/config/privateConfig.js}
set :linked_dirs, %w{node_modules}
# Default value for default_env is {}
set :default_env, { node_env: fetch(:node_env) }

set :keep_releases, 5
set :ssh_options, { :forward_agent => true, :port=>6543 }
namespace :deploy do

  desc 'select a tag via tag=vxxx or redeploy the running rev'
  task :select_tag do
    tag = ENV['tag']
    if !tag
      if fetch(:branch)=='dev'
        tag='dev'
      else
        on roles(:app) do
          within current_path do
            tag = capture(:cat, "REVISION").gsub(/\s+/,'')
          end
        end
      end
    end
    if !tag
      print 'provide a proper tag'
      exit 1
    end
    set :branch, tag
  end

  desc 'Install node modules non-globally'
  task :npm_install do
    on roles(:app) do
        execute "cd #{release_path}/server && npm install"
    end
  end

  desc 'Start application'
  task :start do
    on roles(:app) do
      within current_path do
        execute :'forever', 'start --killSignal=SIGINT --append --uid',fetch(:application),'server/app.js'
      end
    end
  end

  desc 'Stop application'
  task :stop do
    on roles(:app) do
      within current_path do
        execute :'forever', 'stop',fetch(:application)
      end
    end
  end

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      within current_path do
        begin
          Rake::Task['deploy:stop'].invoke
        rescue => e
          puts "deploy:stop failed"
          puts "#{e.class}: #{e.message}"
        end
        Rake::Task['deploy:start'].invoke
      end
    end
  end

  before :restart, 'deploy:npm_install'
  after :publishing, :restart

  desc 'ensure server is correctly running'
  task :ping do
    on roles(:app), in: :sequence do
      within current_path do 
        execute :echo, 'pinging'
        execute :sleep, '4'
        system "curl -o /dev/null --max-time 10 --silent --head --write-out '%{http_code}' "+fetch(:url_ping)+"/ping | grep -q 200"
        if($?.exitstatus != 0) then
          puts 'ping failed: ' + $?.exitstatus.to_s
          exit
        end
      end
    end
  end

  desc "Checkout subdirectory and delete all the other stuff"
  task :checkout_subdir do
    on roles(:app) do
      execute "rm -rf #{release_path}/front"
    end
  end

  desc 'get deployed tag'
  task :version do
    on roles(:app), in: :sequence, wait: 5 do
      within current_path do 
        tag = capture(:cat, "REVISION").gsub(/\s+/,'')
        system "git show-ref|grep #{tag}"
      end
    end
  end
  after "deploy:updating", "deploy:checkout_subdir"
  after :start, 'deploy:ping'
  after :started, 'deploy:select_tag'
end
