# config valid only for current version of Capistrano
lock '3.4.0'

set :application, 'NawabariNet'
set :repo_url, 'git@github.com:Battloika/NawabariNet.git'

# Default branch is :master
ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, ENV.fetch('DEPLOY_TO')

# Default value for :scm is :git
set :scm, :git

# deploy subdir
set :git_strategy, Capistrano::Git::SubDirectoryStrategy
set :project_root, 'server'

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
set :pty, true

# Default value for :linked_files is []
set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/secrets.yml', '.env')

# Default value for linked_dirs is []
set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system')

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
set :keep_releases, 5

set :rbenv_type, :user
set :rbenv_ruby, '2.2.3'
set :rbenv_path, '~/.anyenv/envs/rbenv'
set :rbenv_prefix, "RBENV_ROOT=#{fetch(:rbenv_path)} RBENV_VERSION=#{fetch(:rbenv_ruby)} #{fetch(:rbenv_path)}/bin/rbenv exec"
set :rbenv_map_bins, %w{rake gem bundle ruby rails}
set :rbenv_roles, :all

set :unicorn_pid, "#{shared_path}/tmp/pids/unicorn.pid"

after 'deploy:publishing', 'deploy:restart'
namespace :deploy do
  task :start do
    on roles(:all) do
      execute "cd #{current_path} && (RAILS_ENV=#{fetch(:rails_env)} #{fetch(:rbenv_prefix)} bundle exec rake unicorn:start)"
    end
  end

  task :stop do
    on roles(:all) do
      execute "cd #{current_path} && (RAILS_ENV=#{fetch(:rails_env)} #{fetch(:rbenv_prefix)} bundle exec rake unicorn:stop)"
    end
  end

  task :restart do
    on roles(:all) do
      execute "cd #{current_path} && (RAILS_ENV=#{fetch(:rails_env)} #{fetch(:rbenv_prefix)} bundle exec rake unicorn:stop)"
      execute "cd #{current_path} && (RAILS_ENV=#{fetch(:rails_env)} #{fetch(:rbenv_prefix)} bundle exec rake unicorn:start)"
    end
  end
end
