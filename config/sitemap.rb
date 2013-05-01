require File.join("#{File.dirname(__FILE__)}/../lib", "sitemap_init")
require File.join("#{File.dirname(__FILE__)}/../spec/support", "path")

SitemapGenerator::Sitemap.create do
  paths.each do |key, path|
    unless path == '/' # Homepage added by default
      add path, :changefreq => 'weekly'
    end
  end
end