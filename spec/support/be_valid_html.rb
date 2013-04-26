require 'validator.nu'
require 'json'

# RSpec validator for HTML, using http://validator.nu
#
# See [JSON output](http://wiki.whatwg.org/wiki/Validator.nu_JSON_Output) for details of what is returned
#
# Usage:
#
#     html.should be_valid_html
#
class BeValidHTML
  # @param {String} html - the page HTML
  def matches?(html)
    @contents = html
    @results = JSON.parse(Validator.nu(@contents))
    @errors = @results["messages"].select {|x| x["type"] == "error"}

    @errors.length <= 0
  end

  def description
    "Valid HTML"
  end

  def failure_message
   out = "Invalid HTML\n\nErrors (#{@errors.length}):\n\n"

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

def be_valid_html
  BeValidHTML.new
end