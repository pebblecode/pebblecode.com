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
      user = ENV["HTTP_USER"] || "user"
      password = ENV["HTTP_PASSWORD"] || "password"

      @auth ||=  Rack::Auth::Basic::Request.new(request.env)
      @auth.provided? &&
        @auth.basic? &&
        @auth.credentials &&
        @auth.credentials == [user, password]
    end
  end

  helpers HttpAuthentication
end