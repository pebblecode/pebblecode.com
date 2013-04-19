require 'validator.nu'
require 'json'

# RSpec validator for html, using http://validator.nu
#
# Usage:
#
#     last_response.should have_valid_html
#
class HaveValidHTML
  # @param response - the page response
  def matches?(response)
    @contents = response.body
    @results = JSON.parse(Validator.nu(@contents))
    @errors = @results["messages"].select {|x| x["type"] == "error"}

    @errors.length <= 0
  end

  def description
    "Have valid html"
  end

  def failure_message
   out = "Invalid html\nErrors:\n"

   for e in @errors
    out += "l#{e["firstLine"]}:#{e["firstColumn"]} - l#{e["lastLine"]}:#{e["lastColumn"]} => "
    out += "#{e["message"]}\n"
    out += "#{e["extract"]}\n"
   end

   out
  end

end

def have_valid_html
  HaveValidHTML.new
end