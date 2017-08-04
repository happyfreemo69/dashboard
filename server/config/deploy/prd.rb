set :deploy_to, '/home/deployer/dash-server'
set :user, 'deployer'
set :pid_file_name, 'dash-server.pid'
set :branch, 'prd'
set :url_ping, 'https://dashboard.citylity.com'
role :app, %w{deployer@185.8.50.175}