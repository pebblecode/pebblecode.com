# Ship it! rake task
#
# Merge branch (master by default) to deployment branch, and deploy to server.
#
# Prerequisite:
#
#   * Set up branches on local machine and deployment server
#   * Declare all deployment branches in `ALL_DEPLOYMENT_BRANCHES`
#   * Declare deploy only branches in `DEPLOY_ONLY_BRANCHES` (ie, does not merge master)
#   * Modify `Deploy.command` function as necessary
#
# Usage:
#
#     # Do work on `master`, and commit
#     # Merge `master` to `deployment-branch`, and deploy with:
#     bundle exec rake shipit[deployment-branch]
#
#     # Do work on `some-branch`, and commit
#     # Merge `some-branch` to `deployment-branch`, and deploy with:
#     bundle exec rake shipit:branch[some-branch,deployment-branch]
#
# Notes:
#
#   * Merge conflicts may occur, which the rake tasks don't currently
#     handle. You need to exercise your git-foo in these cases.
#

require 'fileutils'

ALL_DEPLOYMENT_BRANCHES = ["staging", "production", "design"]
DEPLOY_ONLY_BRANCHES = ["design"]

module Deploy
  def self.command(branch)
    # For capitrano - Assume that capistrano task is the same name as the branch
    # "bundle exec cap #{branch} deploy"

    # For heroku - Assume local branch is set up with remote heroku branch
    "git push #{branch} #{branch}:master"
  end

  def self.branch!(branch)
    Rake.sh self.command(branch)
  end

  # Force a push into the sandbox server for given branch
  def self.sandbox!(branch)
    Rake.sh "git push -f sandbox #{branch}:master"
  end
end

module Git
  def self.checkout!(branch, &next_command)
    Rake.sh "git checkout #{branch}", &next_command
  end

  def self.merge!(branch, &next_command)
    Rake.sh "git merge #{branch}", &next_command
  end

  def self.push_origin!(local_branch, remote_branch)
    Rake.sh "git push origin #{local_branch}:#{remote_branch}"
  end

  # Merge `from_branch` and push to remote server, and checkout `from_branch` at the end.
  def self.merge_branch!(from_branch, to_branch)
    run_push_origin = Proc.new do |ok, resp|
      if ok
        self.push_origin!(to_branch, to_branch)
        self.checkout!(from_branch)
      else
        abort(resp.to_s)
      end
    end

    run_merge = Proc.new do |ok, resp|
      if ok
        self.merge!(from_branch, &run_push_origin)
      else
        abort(resp.to_s)
      end
    end

    # Checkout -> merge -> push origin
    self.checkout! to_branch, &run_merge
  end
end

desc "Merge master to branch, and push to origin server."
task "merge_master_and_push_to", [:branch] do |t, args|
  Git.merge_branch!("master", args.branch)
end

desc "Deploy branch to server."
task :deploy, [:branch] do |t, args|
  Deploy.branch!(args.branch)
end

desc "Ship it! Merge master and push branch to origin (if not in `DEPLOY_ONLY_BRANCHES`), then deploy to the server."
task "shipit", [:branch] do |t, args|
  branch = args.branch

  if ALL_DEPLOYMENT_BRANCHES.include? args.branch
    # Special case for staging and production
    if branch == "staging"
      Rake::Task["shipit:pre_staging"].invoke
    end

    unless DEPLOY_ONLY_BRANCHES.include? args.branch
      Rake::Task["merge_master_and_push_to"].invoke(branch)
    end

    Rake::Task["deploy"].invoke(branch)

    if branch == "production"
      Rake::Task["shipit:post_production"].invoke
    end
  else
    puts "Invalid deployment branch: #{branch}"
    puts "Available deployment branches are: #{ALL_DEPLOYMENT_BRANCHES.to_s}"
  end
end

desc "Generate optimize assets and push changes"
task "optimize_assets" do
  build_dir = "public/build"

  Rake.sh "git checkout master"

  # Generate optimized css/js
  Rake.sh "grunt build"
  grunt_build_git_status = `git status -s #{build_dir}`

  unless grunt_build_git_status.empty?
    Rake.sh "git commit -m 'Update optimized assets' #{build_dir}"
    Rake.sh "git push origin master"
  end
end

desc "Generate sitemap and push changes"
task "generate_sitemap" do
  import 'sitemap'

  sitemap_files = "public/sitemap*"

  Rake.sh "git checkout master"
  Rake::Task["sitemap:refresh:no_ping"].invoke

  sitemap_git_status = `git status -s #{sitemap_files}`

  unless sitemap_git_status.empty?
    Rake.sh "git commit -m 'Update sitemap' #{sitemap_files}"
    Rake.sh "git push origin master"
  end
end

namespace "shipit" do
  desc "Before deploying to staging, generate optimized assets and sitemap"
  task :pre_staging do
    Rake::Task["optimize_assets"].invoke
    Rake::Task["generate_sitemap"].invoke
  end

  desc "After deploying to production, ..."
  task :post_production do
    import 'sitemap'

    # Push to public git
    `git push public production:master`

    # Ping search engines
    Rake::Task["sitemap:ping_search_engines"].invoke
  end

  desc "Merge branch to deployment branch, push to remote server, and deploy."
  task :branch, [:from_branch, :deploy_branch] do |t, args|
    from_branch = args.from_branch
    deploy_branch = args.deploy_branch

    if ALL_DEPLOYMENT_BRANCHES.include? deploy_branch
      Git.merge_branch!(from_branch, deploy_branch)

      Rake::Task["deploy"].invoke(deploy_branch)
    else
      puts "Invalid deployment branch: #{args.branch}"
      puts "Available deployment branches are: #{ALL_DEPLOYMENT_BRANCHES.to_s}"
    end
  end
end

desc "Deploy branch to sandbox"
task :sandbox, [:branch] do |t, args|
  Deploy.sandbox!(args.branch)
end
