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

### Staging

The staging site is hosted on heroku: http://pebblecode-staging.herokuapp.com/

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

Currently deployment is manual, with the following process:

1. Development this [repo](https://github.com/pebblecode/pebblecode.com)
2. Files are auto-generated in `dist` during development
3. Copy files to https://github.com/pebblecode/pebblecode.github.io repo, and push to `master`

