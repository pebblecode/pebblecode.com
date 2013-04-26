require 'w3c_validators'

# RSpec validator for CSS, using W3C validators
#
# Usage:
#
#     css_string.should have_valid_css
#
class HaveValidCSS
  include W3CValidators

  # @param {String} css - the CSS of a page
  def matches?(css)
    @validator = CSSValidator.new

    @results = @validator.validate_text(css)
    @errors = @results.errors

    @errors.length <= 0
  end

  def description
    "Have valid CSS"
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

def have_valid_css
  HaveValidCSS.new
end