require 'rubygems'
require 'sitemap_generator'

SitemapGenerator::Sitemap.default_host = 'http://pebblecode.com'
SitemapGenerator::Sitemap.create do
  add '/home', :changefreq => 'daily', :priority => 0.9
  add '/contact_us', :changefreq => 'weekly'
  add '/people', :changefreq => 'weekly'
  add '/work', :changefreq => 'weekly'
  add '/labs', :changefreq => 'weekly'
  add '/find-us', :changefreq => 'weekly'
end