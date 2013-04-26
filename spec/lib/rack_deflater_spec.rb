require 'spec_helper'

# For gzipping pages
describe Rack::Deflater do
  before do
    @path = paths[:homepage]
    get @path
    @page_headers = last_response.headers.clone

    get @path, {}, { "HTTP_ACCEPT_ENCODING" => "gzip" }
    @gzipped_page_headers = last_response.headers.clone
  end

  describe "Content-Encoding" do
    it "is nil for page" do
      @page_headers["Content-Encoding"].should be_nil
    end

    it "is 'gzip' for gzipped page" do
      @gzipped_page_headers["Content-Encoding"].should == "gzip"
    end
  end

  describe "Content-Length" do
    before { @content_length = @page_headers["Content-Length"].to_i }

    it "should be lower for gzipped page" do
      expect(@gzipped_page_headers["Content-Length"].to_i).to be < @content_length
    end
  end

  describe "Etag" do
    before { @etag = @page_headers["Etag"] }

    it "is the same for normal and gzipped page" do
      @gzipped_page_headers["Etag"].should == @etag
    end
  end
end