default_run_options[:pty] = true
set :application, "stickyboard"
set :repository,  "git@github.com:railsrumble/captain-awesome.git"

role :app, "li47-153.members.linode.com"
role :web, "li47-153.members.linode.com"
role :db, "li47-153.members.linode.com", :primary => true

set :deploy_to, "/var/www/apps/#{application}"
set :scm, :git
set :branch, "master"

namespace :deploy do
  desc "Restart Passenger"
  task :restart, :roles => :app, :except => {:no_release => true} do
    run "touch #{current_path}/tmp/restart.txt"
  end

  [:start, :stop].each do |t|
    desc "#{t} task is a no-op with Passenger"
    task(t, :roles => :app){}
  end

  task :after_symlink do
    %w[database.yml].each do |c|
      run "ln -nsf #{shared_path}/system/config/#{c} #{current_path}/config/#{c}"
    end
  end
end
