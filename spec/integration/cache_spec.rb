require_relative '../spec_helper'

describe "Static files" do
  describe "/images" do
    before do
      @image = "/images/logo.png"
      @year_in_sec = 60 * 60 * 24 * 365
    end

    it "is cached for 1 year" do
      get @image

      expect(last_response["Cache-Control"]).to eql("max-age=#{@year_in_sec}, public")
    end
  end
end
