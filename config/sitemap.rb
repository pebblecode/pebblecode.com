require 'rubygems'
require 'sitemap_generator'

require File.join("#{File.dirname(__FILE__)}/../spec/support", "path")

SitemapGenerator::Sitemap.default_host = 'http://pebblecode.com'
SitemapGenerator::Sitemap.create do
  paths.each do |key, p|
    if p == '/'
      add '/', :changefreq => 'daily', :priority => 0.9
    else
      add p, :changefreq => 'weekly'
    end
  end
end