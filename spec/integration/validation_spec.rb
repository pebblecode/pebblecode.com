require_relative '../spec_helper'

describe "All paths", :validate_html => true do
  it "have valid html" do
    for path in paths.values
      get path
      last_response.should have_valid_html
    end
  end
end