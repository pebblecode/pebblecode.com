require_relative '../spec_helper'

describe "/robots.txt" do
  before { @robots_path = "/robots.txt" }

  it "shows on development" do
    settings.environment = "development"
    get @robots_path
    expect(last_response.status).to be HTTP_STATUS_OK
  end

  it "shows on staging" do
    settings.environment = "staging"
    get @robots_path
    expect(last_response.status).to be HTTP_STATUS_OK
  end

  it "doesn't show in production" do
    settings.environment = "production"
    get @robots_path
    expect(last_response.status).to be HTTP_STATUS_NOT_FOUND
  end
end