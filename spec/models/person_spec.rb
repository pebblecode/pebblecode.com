require_relative '../spec_helper'

describe Person do
  describe "#all" do
    it "exists" do
      expect(Person.all.length).to be > 0
    end
  end

  describe "#find_by_index" do
    it "finds Toby Hunt" do
      person = Person.find_by_index(0)
      expect(person[:name]).to eql("Toby Hunt")
    end
  end

  describe "#find_by_name" do
    it "finds Toby Hunt" do
      person = Person.find_by_name("Toby Hunt")
      expect(person[:name]).to eql("Toby Hunt")
    end
  end

  # Note: these tests could break if people add/remove
  # tumblr accounts
  describe "#all_with_tumblr_name" do
    it "has Toby Hunt" do
      toby = Person.find_by_name("Toby Hunt")
      expect(Person.all_with_tumblr_name.include? toby).to be_true
    end

    it "does not have Dom Crossley" do
      dom = Person.find_by_name("Dom Crossley")
      expect(Person.all_with_tumblr_name.include? dom).to be_false
    end
  end
end