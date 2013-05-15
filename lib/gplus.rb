# Library to get Google Plus data
require 'google/api_client'

def get_gplus_data
  pebblecode_gplus_id = '111015721606354758456'
  auth = {
    :client_id => "538180920710-1iskehsaoq2qql5aqtnujntfgop3pblm.apps.googleusercontent.com",
    :client_secret => "Zv0G2BmjLz7eKQMLvNtpj6m9",
    :redirect_uri => "http://localhost:7100/auth/google/callback"
  }

  client = Google::APIClient.new
  plus = client.discovered_api('plus')

  # Initialize OAuth 2.0 client
  client.authorization.client_id = auth[:client_id]
  client.authorization.client_secret = auth[:client_secret]
  client.authorization.redirect_uri = auth[:redirect_uri]

  client.authorization.scope = 'https://www.googleapis.com/auth/plus.me'

  # Request authorization
  redirect_uri = client.authorization.authorization_uri

  # Wait for authorization code then exchange for token
  client.authorization.code = SecureRandom.hex
  client.authorization.fetch_access_token!

  # Make an API call
  result = client.execute(
    :api_method => plus.activities.list,
    :parameters => {'collection' => 'public', 'userId' => 'me'}
  )

  puts result.data
end