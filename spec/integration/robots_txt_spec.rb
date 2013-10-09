require_relative '../spec_helper'

describe "/robots.txt" do
  before do
    @robots_path = "/robots.txt"
    @lib_path = "#{File.dirname(__FILE__)}/../../lib"
  end

  ["development", "staging"].each do |env|
    describe "on #{env}" do
      before do
        app.settings.environment = env
        get @robots_path
      end

      it "returns http status ok code" do
        expect(last_response.status).to be HTTP_STATUS_OK
      end

      it "returns lib/robots_txt_exclude_all.txt" do
        robots_txt = File.read(File.join(@lib_path, "robots_txt_to_exclude_all.txt"))
        expect(last_response.body).to eql(robots_txt)
      end
    end
  end

  describe "on production" do
    before do
      app.settings.environment = "production"
      get @robots_path
    end

    it "returns http status ok code" do
      expect(last_response.status).to be HTTP_STATUS_OK
    end

    it "returns lib/robots_txt_normal.txt" do
      robots_txt = File.read(File.join(@lib_path, "robots_txt_standard.txt"))
      expect(last_response.body).to eql(robots_txt)
    end
  end
end