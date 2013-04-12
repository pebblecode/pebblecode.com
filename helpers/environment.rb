require 'sinatra/base'

module Sinatra
  module Environment
    def is_production?
      settings.environment == "production"
    end

    def is_staging?
      settings.environment == "staging"
    end

    def is_development?
      settings.environment == "development"
    end
  end

  helpers Environment
end