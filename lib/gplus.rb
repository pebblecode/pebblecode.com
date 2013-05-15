# Library to get Google Plus data
require 'rest-client'

def get_gplus_data
  pebblecode_gplus_id = '111015721606354758456'

  # Put in another file!
  browser_key = SECRETS["gplus_browser_key"]

  url = "https://www.googleapis.com/plus/v1/people/#{pebblecode_gplus_id}/activities/public"
  params = {
    :maxResults => 10,
    :key => browser_key
  }

  response = RestClient.get url, {:params => params}
  response.to_s
end