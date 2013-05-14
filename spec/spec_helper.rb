# spec_helper.rb
ENV['RACK_ENV'] = 'test'

require_relative '../application'

require 'rspec'
require 'rack/test'
require 'ruby-debug'
# require 'capybara/rspec'

require 'support/path'
require 'support/be_valid_html'
require 'support/be_valid_css'

# Include in all rspec tests
RSpec.configure do |conf|
  conf.include Rack::Test::Methods
  conf.mock_with :rspec

  # Exclude validate html (you should run it manually)
  conf.filter_run_excluding :validate_html => true
end

# Capybara.save_and_open_page_path = "./tmp"

# Define application for all spec files
def app
  PebbleCodeApp
end
# Capybara.app = PebblecodeApp