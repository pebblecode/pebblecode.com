# Library to get Google Plus data
require 'google_plus'

def get_gplus_data
  pebblecode_gplus_id = '111015721606354758456'
  GooglePlus.api_key = "AIzaSyDV5i4u0t80RMev2pjS_v2-tDEznMoIUk0"

  # Requires login!
  # GooglePlus::Activity.get(pebblecode_gplus_id)
  GooglePlus::Person.get(pebblecode_gplus_id).display_name
end