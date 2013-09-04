# Git rake tasks

namespace :git do
  desc "Add all remote branches"
  task :add_remotes do
    `git remote add sandbox git@heroku.com:pebblecode-sandbox.git`
    `git remote add staging git@heroku.com:pebblecode-staging.git`
    `git remote add production git@heroku.com:pebblecode.git`
    `git remote add public git@github.com:pebblecode/pebblecode.com-site.git`
  end
end