# Ship it! rake task
#
# Merge branch (master by default) to deployment branch, and deploy to server.
#
# Prerequisite:
#
#   * Set up branches on local machine and deployment server
#   * Declare all deployment branches in `ALL_DEPLOYMENT_BRANCHES`
#   * Declare deploy only branches in `DEPLOY_ONLY_BRANCHES` (ie, does not merge master)
#   * Modify `deploy_branch` function as necessary
#
# Usage:
#
#     # Do work on master, and commit
#     # Merge master to deployment-branch, and deploy with:
#     bundle exec rake shipit[deployment-branch]
#
# Notes:
#
#   * Merge conflicts may occur, which the rake tasks don't currently
#     handle. You need to exercise your git-foo in these cases.
#

require 'fileutils'

ALL_DEPLOYMENT_BRANCHES = ["staging", "production", "design"]
DEPLOY_ONLY_BRANCHES = ["design"]

def deploy_command(branch)
  # For capitrano - Assume that capistrano task is the same name as the branch
  # "bundle exec cap #{branch} deploy"

  # For heroku - Assume local branch is set up with remote heroku branch
  "git push #{branch} #{branch}:master"
end

def merge_command(from_branch, to_branch)
  "git checkout #{to_branch}; git merge #{from_branch}"
end

def push_origin_command(local_branch, remote_branch)
  "git push origin #{local_branch}:#{remote_branch}"
end

desc "Merge master to branch, and push to origin server."
task "merge_master_and_push_to", [:branch] do |t, args|
  from_branch = "master"
  to_branch = args.branch
  sh(merge_command(from_branch, to_branch)) do |ok, res|
    if ok
      sh push_origin_command(to_branch, to_branch)
      sh %{ git checkout #{from_branch} }
    else
      puts res
    end
  end
end

desc "Deploy branch to server."
task :deploy, [:branch] do |t, args|
  deploy_branch(args.branch)
end

desc "Ship it! Merge master and push branch to origin (if not in `DEPLOY_ONLY_BRANCHES`), then deploy to the server."
task "shipit", [:branch] do |t, args|
  if ALL_DEPLOYMENT_BRANCHES.include? args.branch
    unless DEPLOY_ONLY_BRANCHES.include? args.branch
      Rake::Task["merge_master_and_push_to"].invoke(args.branch)
    end

    Rake::Task["deploy"].invoke(args.branch)
  else
    puts "Invalid deployment branch: #{args.branch}"
    puts "Available deployment branches are: #{ALL_DEPLOYMENT_BRANCHES.to_s}"
  end
end