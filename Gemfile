source 'https://rubygems.org'
ruby "1.9.2"

gem 'rake', '~>0.9.2.2'
gem "sinatra", '~>1.3.1'
gem 'thin'
gem 'json'

# Helper libs
gem 'sinatra-contrib', '~>1.3.1'

# Front end
gem "haml"
gem "sass"
gem "compass"

# Assets
gem 'sinatra-asset-pipeline'

# New relic
gem 'newrelic_rpm'

# Testing
gem 'rspec'
gem 'w3c_validators'

# Sitemaps
gem "sitemap_generator", "~> 3.4"

group :development, :test do
  # Testing
  gem 'rack-test'
  gem 'capybara', '~>1.1.2'
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