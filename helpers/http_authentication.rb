# encoding: utf-8
require 'sinatra/base'

module Sinatra
  module HttpAuthentication
    def protected_unless_disabled!
      protected! if is_staging? && settings.disable_http_password == false
    end

    def protected!
      unless authorized?
        response['WWW-Authenticate'] = %(Basic realm="Restricted Area")
        throw(:halt, [401, "Not authorized\n"])
      end
    end

    def authorized?
      @auth ||=  Rack::Auth::Basic::Request.new(request.env)
      @auth.provided? &&
        @auth.basic? &&
        @auth.credentials &&
        @auth.credentials == ['pebblecode', 'pebblecode']
    end
  end

  helpers HttpAuthentication
end