# pebble {code} site

This is a simple brochure site written with [sinatra][1].


## Installation

To hack on the site you need to install bundler

    gem install bundler

Then install all the required gems

    bundle install

Start the server

		rake server

Go to `http://localhost:7100`

## Automatic reloading

To autoload the site, this app uses [shotgun][2], but this is wrapped around the rake task, so nothing needs to be done for it to work.

## Views and styling

The files you'll be most concerned with are the view files (under /views) and the stylesheet files (under /views/stylesheets).

The view files are written in [haml][3] and the stylesheets are written in [scss][4].

## Tests

Todo

## Deployment

The site is hosted on [Heroku][5], and deployment is wrapped around a rake task.

### Prerequisites

Set up deployment branches with

		git remote add staging git@heroku.com:pebblecode-staging.git
    git remote add production git@heroku.com:pebblecode.git

### Push to staging

The staging site is at http://pebblecode-staging.herokuapp.com/. It requires authentication with username `pebblecode`, and password `pebblecode`.

To deploy master branch to staging

	rake shipit:production

To manually deploy an arbitrary branch to staging eg, `version-2` branch

  rake shipit:temp[version-2,staging]

#### Initial set up

Only needs to be done once

    heroku create pebblecode-staging --stack cedar --remote staging
    heroku config:add RACK_ENV=staging --app pebblecode-staging

### Ship it!

To deploy master branch to production

    rake shipit:production

This merges the master branch to the production branch, pushes to origin, deploys to production, and checkouts out the master branch.

### Maintenance mode

To turn on/off maintenance mode on heroku

    heroku maintenance:on --app [app]
    heroku maintenance:off --app [app]

[1]: http://www.sinatrarb.com/
[2]: http://github.com/rtomayko/shotgun/
[3]: http://haml-lang.com/
[4]: http://sass-lang.com/
[5]: http://www.heroku.com/
