require_relative '../spec_helper'

describe "Routes" do
  it "shows homepage" do
    get paths[:homepage]
    last_response.body.should include("page-homepage")
  end

  describe "(legacy)" do
    describe "/thoughts" do
      it "redirects to /blog" do
        get "/thoughts"

        expect(last_response.redirect?).to be(true)
        expect(last_response.status).to be(301)
        expect(last_response["Location"]).to include("/blog")
      end
    end

    describe "/products" do
      it "redirects to /labs" do
        get "/products"

        expect(last_response.redirect?).to be(true)
        expect(last_response.status).to be(301)
        expect(last_response["Location"]).to include("/labs")
      end
    end

    describe "/people" do
      for person in Person.all
        tumblr_name = person[:tumblr_name]

        if tumblr_name
          name = person[:name]
          tumblr_url = person_path(tumblr_name)
          person_url = person_path(name)

          it "redirects tumblr url #{tumblr_url} to the person url #{person_url}" do
            get tumblr_url

            expect(last_response.redirect?).to be(true)
            expect(last_response.status).to be(301)
            expect(last_response["Location"]).to include(person_url)
          end
        end
      end
    end
  end
end