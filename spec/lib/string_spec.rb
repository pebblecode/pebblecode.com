# encoding: utf-8
require_relative '../spec_helper'

describe String do
  describe "#to_slug" do
    it "converts upper case to lower case" do
      expect("CASH".to_slug).to be == "cash"
      expect("JOHNNEY CASH".to_slug).to be == "johnney-cash"
    end

    it "converts single words to a slug" do
      expect("Johnny".to_slug).to be == "johnny"
    end

    it "converts multi words to a slug" do
      expect("Johnny Cash".to_slug).to be == "johnny-cash"
    end

    it "converts special characters to ascii" do
      expect("Vincent Martínez".to_slug).to be == "vincent-martinez"
    end
  end
end