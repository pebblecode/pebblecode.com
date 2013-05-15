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

# For production deployment
gem "heroku", "~> 2.39.2"

# Redirect domains
gem "rack-force_domain"

# Assets
gem 'sinatra-asset-pipeline'

# New relic
gem 'newrelic_rpm'

# Testing
gem 'rspec'
gem 'w3c_validators'

# Sitemaps
gem "sitemap_generator", "~> 3.4"

# Google apis
gem "google-api-client", "~> 0.6.3"

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