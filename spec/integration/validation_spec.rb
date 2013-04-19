require_relative '../spec_helper'
require 'html_acceptance'

class HaveValidHTML

  # This is the matching method called by RSpec
  # The response is passed in as an argument when you do this:
  # page.should have_valid_html

  def matches?(page)
    path  = File.join(File.dirname(__FILE__), '../../tmp/validation' )
    h     = HTMLAcceptance.new(path)
    url   = page.location || "/"
    @v    = h.validator(page.body, url)
    @v.valid?
  end

  def description
    "Have valid html"
  end

  def failure_message
   "#{@v.resource} Invalid html (fix or run rake html_acceptance task to add exceptions)\n#{@v.resource} exceptions:\n #{@v.exceptions}\n\n #{@v.html}"
  end

end

def have_valid_html
  HaveValidHTML.new
end

describe "All paths" do
  it "have valid html" do
    for path in ["/"] #paths.values
      get path
      last_response.should have_valid_html
    end
  end
end