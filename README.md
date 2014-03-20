# pebble-sites

A grunt project to create the pebble {code} & pebble.it sites

## Installation

1. Install [node.js](http://nodejs.org/), [npm](https://npmjs.org/), [grunt.js](http://gruntjs.com/), and [Sass](http://sass-lang.com/).

2. Install the sass gem

        gem install sass -v 3.3.0.rc.2

2. Install all required packages

        npm i

3. Generate the site (only needed once)

        grunt make

4. Start dev server & tasks

        grunt

## LiveReload

If you wish to use liveReload you will need to install & activate the relivant browser extension.

## Deployment

Before being able to deploy, you will need to setup your environmnet, with

    grunt deploy:init

### Staging

The staging site is hosted on heroku: http://pebblecode-staging.herokuapp.com/

To push the master branch to staging, run:

    grunt deploy:staging

Or if you want a particular branch, run:

    grunt deploy:staging --branch branch-name

where `branch-name` is the branch you want to push.

If there are errors with the push eg, `error: failed to push some refs`, you can add the `--force` flag eg,

    grunt deploy:staging --force

#### HTTP passwords

To check the username/password (HTTP_USERNAME/HTTP_PASSWORD respectively)

    heroku config --app pebblecode-staging

To change the username/password

    heroku config:add HTTP_USERNAME=name --app pebblecode-staging
    heroku config:add HTTP_PASSWORD=pass --app pebblecode-staging

#### Initialisation

It was initialised with

    heroku config:add ENV=staging --app pebblecode-staging

### Production

The production site is hosted on github pages: http://pebblecode.com/, with files hosted at https://github.com/pebblecode/pebblecode.github.io

The deploy to production, run

    grunt deploy:production

By default, it checks for uncommitted files, and won't allow you to proceed unless you commit/stash existing changes. To bypass this, use `--force`.

The grunt task does the following:

1. Copies files from `dist` to `temp/production` (which is a clone of https://github.com/pebblecode/pebblecode.github.io from `grunt deploy:init`)
2. Pushes to the production `master` branch, which should automatically be deployed to github

