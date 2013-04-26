# Rake tasks for http password on live sites

namespace "password" do
  @allowed_envs = ["staging", "sandbox"]

  desc "Enable http password for environment"
  task :enable, :env do |_, args|
    env = args.env
    fail "Invalid environment. Allowed are: #{@allowed_envs}" unless @allowed_envs.include? env

    cmd = "heroku config:remove DISABLE_HTTP_PASSWORD --app pebblecode-#{env}"
    sh cmd
  end

  desc "Disable http password for environment"
  task :disable, :env do |_, args|
    env = args.env
    fail "Invalid environment. Allowed are: #{@allowed_envs}" unless @allowed_envs.include? env

    cmd = "heroku config:add DISABLE_HTTP_PASSWORD=true --app pebblecode-#{env}"
    sh cmd
  end
end
