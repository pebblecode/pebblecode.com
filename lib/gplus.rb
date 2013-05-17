# Library to get Google Plus data
require 'rest-client'

def gplus_public_activities(browser_key, gplus_id)
  url = "https://www.googleapis.com/plus/v1/people/#{gplus_id}/activities/public"
  params = {
    :maxResults => 10,
    :key => browser_key
  }

  response = RestClient.get url, {:params => params}
  response.to_s
end