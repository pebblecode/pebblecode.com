# Test rake tasks

namespace "test" do
  desc "Test all"
  task :all, :url do |_, args|
    url = args.url
    run_cmd =  "bundle exec guard & grunt test --url=#{url}"

    sh run_cmd
  end
end