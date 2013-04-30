require 'rubygems'
require 'sitemap_generator'

SitemapGenerator::Sitemap.default_host = 'http://pebblecode.com'
SitemapGenerator::Sitemap.create do
  add '/', :changefreq => 'daily', :priority => 0.9
  add '/people', :changefreq => 'weekly'
  add '/work', :changefreq => 'weekly'
  add '/labs', :changefreq => 'weekly'
  add '/find-us', :changefreq => 'weekly'
end