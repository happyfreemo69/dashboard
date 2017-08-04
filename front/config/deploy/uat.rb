set :deploy_to, '/home/deployer/dash-front'
set :user, 'deployer'
set :pid_file_name, 'dashboard.pid'
set :branch, 'uat'
set :url_ping, 'https://dashboard-uat.citylity.com'
role :app, %w{deployer@185.8.50.64}
