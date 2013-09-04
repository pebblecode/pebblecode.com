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

    def load_dev?
      load_dev = is_development?

      # Override to true if `dev` url param exists
      if params.has_key? "dev"
        load_dev = true
      end

      # Override to false if `prod` url param exists.
      # Would also override dev param
      if params.has_key? "prod"
        load_dev = false
      end

      return load_dev
    end
  end

  helpers Environment
end