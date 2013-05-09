# Test rake tasks

namespace "test" do
  desc "Run all tests on development url"
  task :all, :dev_url do |_, args|
    url = args.dev_url
    fail "Development url required for integration tests" unless url
    run_cmd =  "grunt test --url=#{url} & bundle exec guard"

    sh run_cmd
  end
end