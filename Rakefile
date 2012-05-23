# Rake file to help with Vistazo development


#####################################################################
# Server
#####################################################################

desc "Start the server using the development Procfile."
task "server" do
  start_server_cmd = "foreman start -f Procfile_development"
  sh start_server_cmd
end


#####################################################################
# Deploy to staging/production
#####################################################################

desc "Merge master to branches, and push to remote server."
namespace "merge_master_and_push_to" do
  desc "Switch to branch, merge master branch and switch back to master branch. Defaults to 'staging' branch."
  task :branch, [:branch] do |t, args|
    args.with_defaults(:branch => "staging")
    checkout_merge_cmd = "git checkout #{args.branch}; git merge master"
    sh(checkout_merge_cmd) do |ok, res|
      if ok
        push_cmd = "git push origin #{args.branch}:#{args.branch}"
        sh push_cmd
        sh %{ git checkout master }
      else
        puts res
      end
    end
  end

  desc "Switch to staging branch, merge master branch and switch back to master branch."
  task :staging do |t, args|
    Rake::Task["merge_master_and_push_to:branch"].invoke("staging")
  end

  desc "Switch to production branch, merge master branch and switch back to master branch."
  task :production do |t, args|
    Rake::Task["merge_master_and_push_to:branch"].invoke("production")
  end
end

desc "Deploy branches to server."
namespace "deploy" do
  desc "Deploy branch to branch server. Defaults to staging branch."
  task :branch, [:branch] do |t, args|
    args.with_defaults(:branch => "staging")
    deploy_cmd = "git push #{args.branch} #{args.branch}:master"
    sh deploy_cmd
  end

  desc "Deploy staging branch to http://pebblecode-staging.herokuapp.com/"
  task :staging do
    Rake::Task["deploy:branch"].invoke("staging")
  end

  desc "Deploy production branch to http://pebblecode.com/"
  task :production do
    Rake::Task["deploy:branch"].invoke("production")
  end
end

desc "Ship it! Merge and pushes branches to github, then deploy them to the server."
namespace "shipit" do

  desc "Merge and push branch to github, then deploy to server."
  task :branch, [:branch] do |t, args|
    args.with_defaults(:branch => "staging")
    Rake::Task["merge_master_and_push_to:branch"].invoke(args.branch)
    Rake::Task["deploy:branch"].invoke(args.branch)
  end

  desc "Merge and push staging branch to github, then deploy to http://pebblecode-staging.herokuapp.com/"
  task :staging do
    Rake::Task["shipit:branch"].invoke("staging")
  end

  desc "Merge and push production branch to github, then deploy to http://pebblecode.com/"
  task :production do
    Rake::Task["shipit:branch"].invoke("production")
  end

  desc "Merge branch to deployment branch, push to remote server, and deploy."
  task :temp, :branch_name, :deploy_branch do |t, args|
    args.with_defaults(:deploy_branch => "staging")
    checkout_merge_cmd = "git checkout #{args.deploy_branch}; git merge #{args.branch_name}"
    sh(checkout_merge_cmd) do |ok, res|
      if ok
        # push deployment branch to origin
        push_cmd = "git push origin #{args.deploy_branch}:#{args.deploy_branch}"
        sh push_cmd

        checkout_cmd = "git checkout #{args.branch_name}"
        sh checkout_cmd

        # deploy to deployment master branch
        deploy_cmd = "git push #{args.deploy_branch} #{args.branch_name}:master"
        sh deploy_cmd
      else
        puts res
      end
    end
  end
end