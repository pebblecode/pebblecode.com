require 'validator.nu'
require 'json'

# RSpec validator for html, using http://validator.nu
#
# See [JSON output](http://wiki.whatwg.org/wiki/Validator.nu_JSON_Output) for details of what is returned
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
   out = "Invalid html\n\nErrors:\n\n"

   for e in @errors
    out += "* "

    first_line = e["firstLine"]
    first_column = e["firstColumn"]
    last_line = e["lastLine"]
    last_column = e["lastColumn"]

    if first_line || first_column || last_line || last_column
      if first_line
        out += "line #{first_line}[#{first_column}], #{last_line}[#{last_column}] => "
      else
        out += "line #{last_line}[#{first_column}:#{last_column}] => "
      end
    end

    out += "#{e["message"]}\n"
    out += "#{e["extract"]}\n"
   end

   out
  end

end

def have_valid_html
  HaveValidHTML.new
end