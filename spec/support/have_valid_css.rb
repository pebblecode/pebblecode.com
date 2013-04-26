require 'w3c_validators'

# RSpec validator for CSS, using W3C validators
#
# Usage:
#
#     last_response.should have_valid_css
#
class HaveValidCSS
  include W3CValidators

  # @param response - the page response
  def matches?(response)
    @validator = CSSValidator.new

    @contents = response.body
    @results = @validator.validate_text(@contents)
    @errors = @results.errors

    @errors.length <= 0
  end

  def description
    "Have valid css"
  end

  def failure_message
   out = "Invalid css\n\nErrors:\n\n"

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