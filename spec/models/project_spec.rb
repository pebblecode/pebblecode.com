require_relative '../spec_helper'

describe Project do
  describe "#all" do
    it "should exist" do
      expect(Project.all.length).to be > 0
    end
  end
end