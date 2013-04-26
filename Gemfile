source 'https://rubygems.org'

gem 'rake'
gem "sinatra"
gem 'thin'
gem 'json'

# Helper libs
gem 'sinatra-contrib'

# Front end
gem "haml"
gem "sass"
gem "compass"
gem 'rdiscount'  # For markdown usage

# For production deployment
gem 'heroku'

# Redirect domains
gem "rack-force_domain"

# New relic
gem 'newrelic_rpm'

# Testing
gem 'rspec'
gem 'w3c_validators'

group :development, :test do
  # Testing
  gem 'rack-test'
  gem 'capybara'
  gem 'validator.nu'
  gem 'guard'
  gem 'guard-rspec'
  gem 'rb-inotify', :require => false
  gem 'rb-fsevent', :require => false
  gem 'rb-fchange', :require => false

  # Servers
  gem 'shotgun'
  gem 'foreman'
  gem 'ruby-debug19', :require => 'ruby-debug'
end