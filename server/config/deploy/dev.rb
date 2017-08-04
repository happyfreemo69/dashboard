set :deploy_to, '/home/deployer/dash-server'
set :user, 'deployer'
set :pid_file_name, 'dash-server.pid'
set :branch, 'dev'
set :url_ping, 'https://dashboard-dev.citylity.com'
role :app, %w{deployer@185.8.50.133}
server '185.8.50.133', user: 'deployer', roles: %w{web} 

