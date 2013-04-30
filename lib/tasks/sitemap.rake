require 'sitemap_generator/tasks'

namespace "sitemap" do
  desc "Run individual spec. Can also pass in a line number."
  task :ping_search_engines do
    require File.join("#{File.dirname(__FILE__)}/../../lib", "sitemap_init")

    SitemapGenerator::Sitemap.default_host = 'http://pebblecode.com'
    SitemapGenerator::Sitemap.ping_search_engines
  end
end