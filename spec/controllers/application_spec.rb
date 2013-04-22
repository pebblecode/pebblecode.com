require_relative '../spec_helper'

describe "Routes" do
  it "shows homepage" do
    get paths[:homepage]
    last_response.body.should include("page-homepage")
  end
end