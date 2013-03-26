# encoding utf-8

require 'rubygems'
require 'sinatra'
require './lib/partials'
require 'haml'
require 'sass'
require 'compass'
require 'rdiscount'
require 'sinatra/content_for'
require 'newrelic_rpm'

helpers Sinatra::Partials
require_relative 'helpers/init'
helpers Sinatra::ContentFor

set :root, File.dirname(__FILE__)
set :environment, ENV["RACK_ENV"] || "development"
set :blog_url, "http://blog.pebblecode.com"
set :jobs_url, "http://pebblecode.mytribehr.com/careers"

configure do
  # Redirect all urls on production (http://github.com/cwninja/rack-force_domain)
  use Rack::ForceDomain, ENV["DOMAIN"]

  Compass.configuration do |config|
    config.project_path = File.dirname(__FILE__)
    config.sass_dir = 'views/stylesheets'
  end

  set :haml, { :format => :html5 }
  set :scss, Compass.sass_engine_options
end

get '/stylesheets/screen.css' do
  content_type 'text/css', :charset => 'utf-8'
  scss :'stylesheets/screen'
end

get '/' do
  protected! if settings.environment == "staging"

  @page_name = "homepage"
  haml :index, :layout => :'layouts/application'
end

get '/thoughts' do
  protected! if settings.environment == "staging"

  if settings.environment == "development"
    # Tumblr blog styles
    erb :thoughts
  else
    # Actual tumblr blog
    redirect settings.blog_url
  end
end

get '/jobs' do
  # Stackoverflow blog
  redirect settings.jobs_url
end

############################################################
# Olympic data visualisation
############################################################

get '/stylesheets/olympic-data-vis.css' do
  content_type 'text/css', :charset => 'utf-8'
  scss :'stylesheets/olympic-data-vis'
end

get '/olympic-data-vis' do
  @page_name = "olympic-data-vis"
  haml :"olympic-data-vis", :layout => :'layouts/application'
end

# Get an arbitrary path
get '/get' do
  url_path = params["url"]
  return "Error" if url_path.empty?

  uri = URI.parse(url_path)
  response = Net::HTTP.get_response uri

  response.body
end

############################################################

get '/:page' do
  protected! if settings.environment == "staging"

  @page_name = params['page']
  haml "#{@page_name}".to_sym, :layout => :'layouts/application'
end

error do
  @page_name = "404"
  haml "404".to_sym, :layout => :'layouts/application'
end
