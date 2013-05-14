# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'rspec', :cli => '--color', :version => 2 do
  watch(%r{^spec/.+_spec\.rb$})
  watch(%r{^lib/(.+)\.rb$})     { |m| "spec/lib/#{m[1]}_spec.rb" }
  watch('spec/spec_helper.rb')  { "spec" }

  watch(%r{^models/(.+)\.rb$})                           { |m| "spec/models/#{m[1]}_spec.rb" }
  watch(%r{^views/(.*)(\.erb|\.haml)$})                 { |m| "spec/views/#{m[1]}#{m[2]}_spec.rb" }
  watch(%r{^application.rb$})  { |m| ["spec"] }
  watch(%r{^spec/support/(.+)\.rb$})                  { "spec" }

  watch(%r{^helpers/(.+)\.rb$}) { |m| ["spec"] }

  # Capybara request specs
  # watch(%r{^app/views/(.+)/.*\.(erb|haml)$})          { |m| "spec/requests/#{m[1]}_spec.rb" }
end

