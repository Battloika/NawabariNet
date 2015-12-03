worker_processes Integer(ENV["WEB_CONCURRENCY"] || 3)
timeout 60
preload_app true

listen "/var/www/server/shared/tmp/sockets/unicorn.sock"
pid "/var/www/server/shared/tmp/pids/unicorn.pid"

working_directory "/var/www/server/current"

before_fork do |server, worker|
  Signal.trap 'TERM' do
    puts 'Unicorn master intercepting TERM and sending myself QUIT instead'
    Process.kill 'QUIT', Process.pid
  end

  defined?(ActiveRecord::Base) and
    ActiveRecord::Base.connection.disconnect!
end

after_fork do |server, worker|
  Signal.trap 'TERM' do
    puts 'Unicorn worker intercepting TERM and doing nothing. Wait for master to send QUIT'
  end

  defined?(ActiveRecord::Base) and
    ActiveRecord::Base.establish_connection
end

stderr_path File.expand_path('/var/www/server/shared/log/error_unicorn.log', ENV['RAILS_ROOT'])
stdout_path File.expand_path('/var/www/server/shared/log/unicorn.log', ENV['RAILS_ROOT'])
