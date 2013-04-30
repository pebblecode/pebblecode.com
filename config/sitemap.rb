require 'rubygems'
require 'sitemap_generator'

require File.join("#{File.dirname(__FILE__)}/../spec/support", "path")

SitemapGenerator::Sitemap.default_host = 'http://pebblecode.com'
SitemapGenerator::Sitemap.create do
  paths.each do |key, path|
    unless path == '/' # Homepage added by default
      add path, :changefreq => 'weekly'
    end
  end
end