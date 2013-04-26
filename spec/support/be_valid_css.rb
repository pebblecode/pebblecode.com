require 'w3c_validators'

# RSpec validator for CSS, using W3C validator
#
# Usage:
#
#     css_string.should be_valid_css
#
class BeValidCSS
  include W3CValidators

  # @param {String} css - the CSS of a page
  def matches?(css)
    @validator = CSSValidator.new

    @results = @validator.validate_text(css)
    @errors = @results.errors

    @errors.length <= 0
  end

  def description
    "Valid CSS"
  end

  def failure_message
   out = "Invalid CSS\n\nErrors (#{@errors.length}):\n\n"

   for e in @errors
    out += "* "
    out += "#{e}\n"
   end

   out
  end

end

def be_valid_css
  BeValidCSS.new
end