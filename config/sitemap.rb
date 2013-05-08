require File.join("#{File.dirname(__FILE__)}/../lib", "sitemap_init")
require File.join("#{File.dirname(__FILE__)}/../spec/support", "path")
require File.join("#{File.dirname(__FILE__)}/../models", "person")

SitemapGenerator::Sitemap.create do
  paths.each do |key, path|
    unless path == '/' # Homepage added by default
      add path, :changefreq => 'weekly'
    end
  end

  Person.all_urls.each do |url|
    add url, :changefreq => 'weekly'
  end
end