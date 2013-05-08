# Test rake tasks

namespace "test" do
  desc "Test all"
  task :all, :url do |_, args|
    url = args.url
    run_cmd =  "grunt test --url=#{url} & bundle exec guard"

    sh run_cmd
  end
end