# Rake tasks for http password on live sites

namespace "password" do
  @allowed_envs = ["staging", "sandbox"]

  def fail_unless_valid_env!(env)
    fail "Invalid environment. Allowed are: #{@allowed_envs}" unless @allowed_envs.include? env
  end

  desc "Enable http password for environment. Args = [environment]"
  task :enable, :env do |_, args|
    env = args.env
    fail_unless_valid_env!(env)

    cmd = "heroku config:remove DISABLE_HTTP_PASSWORD --app pebblecode-#{env}"
    sh cmd
  end

  desc "Disable http password for environment. Args = [environment]"
  task :disable, :env do |_, args|
    env = args.env
    fail_unless_valid_env!(env)

    cmd = "heroku config:add DISABLE_HTTP_PASSWORD=true --app pebblecode-#{env}"
    sh cmd
  end

  desc "Enable http password for environment. Args = [environment,user,password]"
  task :set, :env, :user, :password do |_, args|
    env = args.env
    fail_unless_valid_env!(env)

    user = args.user
    password = args.password

    if user && password
      sh "heroku config:add HTTP_USER=#{user} --app pebblecode-#{env}"
      sh "heroku config:add HTTP_PASSWORD=#{password} --app pebblecode-#{env}"
    else
      fail "No user/password"
    end
  end
end
