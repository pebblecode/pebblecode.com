# spec_helper.rb
ENV['RACK_ENV'] = 'test'

require_relative '../application'

require 'rspec'
require 'rack/test'
require 'ruby-debug'
# require 'capybara/rspec'

require 'support/path'

# Include in all rspec tests
RSpec.configure do |conf|
  conf.include Rack::Test::Methods
  conf.mock_with :rspec

  conf.include PathSpecHelper
end

# Capybara.save_and_open_page_path = "./tmp"

# Define application for all spec files
def app
  Sinatra::Application
end
# Capybara.app = PebblecodeApp