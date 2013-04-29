# encoding: utf-8
require 'rubygems'
require 'sinatra'
require './lib/partials'
require './lib/string'
require './lib/constants'
require 'haml'
require 'sass'
require 'compass'
require 'rdiscount'
require 'sinatra/content_for'
require 'newrelic_rpm'

helpers Sinatra::Partials
require_relative 'helpers/init'
require_relative 'models/init'
helpers Sinatra::ContentFor

set :root, File.dirname(__FILE__)
set :environment, ENV["RACK_ENV"] || "development"
set :disable_http_password, ENV["DISABLE_HTTP_PASSWORD"] || false
set :blog_url, "http://blog.pebblecode.com"
set :jobs_url, "http://pebblecode.mytribehr.com/careers"

configure do
  # Redirect all urls on production (http://github.com/cwninja/rack-force_domain)
  use Rack::ForceDomain, ENV["DOMAIN"] if settings.environment != "test"

  # Gzips pages
  use Rack::Deflater

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

# Show lib/robots_txt_to_exclude_all.txt
#
# Only show on non-production sites
get '/robots.txt' do
  if is_production?
    redirect not_found
  else
    content_type 'text/plain', :charset => 'utf-8'
    File.read(File.join('lib', 'robots_txt_to_exclude_all.txt'))
  end
end

get '/' do
  protected_unless_disabled!

  @page_name = "homepage"
  haml :index, :layout => :'layouts/application'
end

get '/blog' do
  protected_unless_disabled!

  if is_development?
    # Tumblr blog styles
    erb :blog
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
# Legacy routes
############################################################

get '/thoughts' do
  redirect '/blog', 301
end

get '/products' do
  redirect '/labs', 301
end

# Route all tumblr names to person name url
Person.all_with_tumblr_name.each do |person|
  tumblr_name = person[:tumblr_name]
  if tumblr_name
    tumblr_url = "/people/" + tumblr_name.to_slug
    name = person[:name]
    name_url = "/people/" + name.to_slug

    get tumblr_url do
      redirect name_url, 301
    end
  end
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

def render_page(page_name)
  protected_unless_disabled!

  @page_name = page_name
  haml "#{page_name}".to_sym, :layout => :'layouts/application'
end

def render_people_page(person = nil)
  if (person == nil) || (Person.slug_exists? person)
    @people = Person.all.shuffle # Shuffle every time it reloads
    @person_slug = person
    render_page("people")
  else
    redirect "/people"
  end
end

get '/labs' do
  @projects = Project.all
  render_page "labs"
end

get '/people' do
  render_people_page
end

get '/people/:person' do
  render_people_page params['person']
end

get '/:page' do
  render_page(params['page'])
end

error do
  @page_name = "404"
  haml "404".to_sym, :layout => :'layouts/application'
end
