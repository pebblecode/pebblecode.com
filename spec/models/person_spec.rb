require_relative '../spec_helper'

describe Person do
  describe "#all" do
    it "should exist" do
      expect(Person.all.length).to be > 0
    end
  end
end