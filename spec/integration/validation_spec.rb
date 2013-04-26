require_relative '../spec_helper'
require 'w3c_validators'

include W3CValidators

@validator = MarkupValidator.new

describe "All paths", :validate_html => true do
  it "have valid html" do
    for path in paths.values
      get path
      last_response.should have_valid_html
    end
  end
end

describe "screen.css", :validate_html => true do
  before do
    @validator = CSSValidator.new
  end

  it "should be valid" do
    get "/stylesheets/screen.css"

    results = @validator.validate_text(last_response.body)

    expect(results.errors.length).to be(0)
  end
end