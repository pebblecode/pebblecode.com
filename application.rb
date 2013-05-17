# encoding: utf-8
require 'rubygems'
require 'sinatra/base'
require 'haml'
require 'sass'
require 'compass'
require 'sinatra/content_for'
require 'newrelic_rpm'
require 'sinatra/asset_pipeline'
require 'twitter'
require 'tumblr_client'

require './lib/string'
require './lib/constants'
require './lib/gplus'

require './lib/helpers/init'
require './models/init'

class PebbleCodeApp < Sinatra::Base
  register Sinatra::AssetPipeline

  set :root, File.dirname(__FILE__)
  set :environment, ENV["RACK_ENV"] || "development"
  set :disable_http_password, ENV["DISABLE_HTTP_PASSWORD"] || false

  set :assets_precompile, %w(*.png *.gif *.jpg *.svg *.eot *.ttf *.woff)
  set :assets_prefix, 'build'

  set :blog_url, "http://blog.pebblecode.com"
  set :jobs_url, "http://pebblecode.mytribehr.com/careers"

  # Use secrets yml file for development
  # Production should have ENV variables
  SECRETS = YAML.load_file("#{settings.root}/config/secrets.yml") if (settings.environment == "development")

  configure do
    # Redirect all urls on production (http://github.com/cwninja/rack-force_domain)
    use Rack::ForceDomain, ENV["DOMAIN"] if (settings.environment != "test" && settings.environment != "development")

    # Gzips pages
    use Rack::Deflater

    Compass.configuration do |config|
      config.project_path = File.dirname(__FILE__)
      config.sass_dir = 'views/stylesheets'
    end

    set :haml, { :format => :html5 }
    set :scss, Compass.sass_engine_options
  end

  helpers Sinatra::Partials
  helpers Sinatra::ContentFor
  helpers Sinatra::Environment
  helpers Sinatra::HttpAuthentication

  get '/stylesheets/screen.css' do
    content_type 'text/css', :charset => 'utf-8'
    scss :'stylesheets/screen', :style => :compressed
  end

  # Show lib/robots_txt_to_exclude_all.txt
  #
  # Only show on non-production sites
  get '/robots.txt' do
    content_type 'text/plain', :charset => 'utf-8'

    if is_production?
      File.read(File.join('lib', 'robots_txt_standard.txt'))
    else
      File.read(File.join('lib', 'robots_txt_to_exclude_all.txt'))
    end
  end

  get '/' do
    protected_unless_disabled!

    @page_name = "homepage"
    haml :index, :layout => :'layouts/application'
  end

  ############################################################
  # Temporary hack for development
  get '/gplus' do
    pebblecode_gplus_id = '111015721606354758456'

    content_type :json
    gplus_public_activities(SECRETS["gplus_browser_key"], pebblecode_gplus_id)
  end

  get '/twitter' do
    pebblecode_twitter_screen_name = 'pebblecode'

    Twitter.configure do |config|
      config.consumer_key = SECRETS["twitter"]["consumer_key"]
      config.consumer_secret = SECRETS["twitter"]["consumer_secret"]
      config.oauth_token = SECRETS["twitter"]["oauth_token"]
      config.oauth_token_secret = SECRETS["twitter"]["oauth_token_secret"]
    end

    output = []
    tweets = Twitter.user_timeline(pebblecode_twitter_screen_name, :count => 10)
    tweets.each do |tweet|
      screen_name = tweet.user.screen_name

      output << {
        :id => tweet.id,
        :text => tweet.text,
        :screen_name => screen_name,
        :created_at => tweet.created_at,
        :url => "https://twitter.com/#{screen_name}/status/#{tweet.id}"
      }
    end

    content_type :json
    output.to_json
  end

  get '/tumblr' do
    pebblecode_tumblr_url = "blog.pebblecode.com"

    Tumblr.configure do |config|
      config.consumer_key = SECRETS["tumblr"]["consumer_key"]
      config.consumer_secret = SECRETS["tumblr"]["consumer_secret"]
    end
    client = Tumblr::Client.new

    content_type :json
    client.posts("blog.pebblecode.com", :limit => 10).to_json
  end
  ############################################################

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
    redirect not_found
  end

  not_found do
    @page_name = "404"
    haml "404".to_sym, :layout => :'layouts/application'
  end
end
