require 'rubygems'
require 'sinatra'
require './lib/partials'
require 'haml'
require 'sass'
require 'compass'

helpers Sinatra::Partials
require_relative 'helpers/init'

set :environment, ENV["RACK_ENV"] || "development"
set :blog_url, "http://blog.pebblecode.com"

configure do
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

get '/:page' do
  protected! if settings.environment == "staging"

  @page_name = params['page']
  haml "#{@page_name}".to_sym, :layout => :'layouts/application'
end
