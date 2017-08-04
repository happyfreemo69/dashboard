set :deploy_to, '/home/deployer/dashboard'
set :user, 'deployer'
set :pid_file_name, 'dashboard.pid'
set :branch, 'prd'
set :url_ping, 'https://dashboard.citylity.com'
role :app, %w{deployer@185.8.50.175}