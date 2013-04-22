# pebble {code} site

This is a simple brochure site written with [sinatra][1].


## Installation

1. Install bundler

        gem install bundler

2. Install all required gems

        bundle install

3. Install [grunt](http://gruntjs.com/) to validate javascript files by following instructions at http://gruntjs.com/getting-started
4. Install node packages

        npm install

5. Start the server

	    rake server

Go to `http://localhost:7100`. Note that the console also logs any [jshint](http://jshint.com/) errors in javascript files.

## Automatic reloading

To autoload the site, this app uses [shotgun][2], but this is wrapped around the rake task, so nothing needs to be done for it to work.

## Views and styling

The files you'll be most concerned with are the view files (under /views) and the stylesheet files (under /views/stylesheets).

The view files are written in [haml][3] and the stylesheets are written in [scss][4].

## Javascript

### Development

To create a new javascript page

1. Create a js file in `public/javascripts/app/[page-name].js` with the following structure

        define([
          // required modules
        ], function() { // <-- parameters for the modules
          "use strict";

          // Code here

        });

2. Include the js file into the `views/[page-name].haml` files (note: no need for `.js` extension)

        - content_for :script_js do
          %script{ :type => "text/javascript" }
            :plain
              require(["main"], function() {
                require(["app/[js-file-name]"]);
              });

3. Add the js file into `Gruntfile.js` under requirejs > compile > options > modules (for optimization)

         {
           name: "app/[js-file-name]",
           exclude: ["main"]
         }

### Optimization

To optimization the javascript files for production run

    grunt build

Commit the changes, and the layout file will automatically handle using the built files on non-development environments.

To force the page to use the development js, add `dev` as a query parameter in the url eg, http://localhost:7770?dev

To force the page to use the production js, add `prod` as a query parameter in the url (this also overrides `dev`) eg, http://localhost:7770?prod

## Tests


Uses [rspec](http://rspec.info/) for unit tests and [casperjs](http://casperjs.org/) for integration tests (probably remove one of them in future).

### RSpec

Run tests with

    bundle exec guard

Also to run it separately

    bundle exec rake spec

To run an individual spec

    bundle exec rake spec:run[filename]

    # eg,
    bundle exec rake spec:run[spec/controllers/application_spec.rb]

### Casper

Install casper

    brew install casperjs

Run tests

    grunt test

## Deployment

The site is hosted on [Heroku][5].

Development workflow works like this:

* Play around and try new things on [sandbox site](http://pebblecode-sandbox.herokuapp.com/)
* If a feature is something intended for production, develop on a branch and merge into `master` (or just work off `master` directly if it is a small change)
* When master is ready to be show to someone else, push to [staging site](http://pebblecode-staging.herokuapp.com/)
* When `staging` is ready for production, push to [production site](http://pebblecode.com/)

### HTTP password

By default the staging/sandbox sites have a http password with username `pebblecode`, and password `pebblecode`.

To disable the password

    # For staging
    heroku config:add DISABLE_HTTP_PASSWORD=true --app pebblecode-staging

    # For sandbox
    heroku config:add DISABLE_HTTP_PASSWORD=true --app pebblecode-sandbox

To enable the password

    heroku config:remove DISABLE_HTTP_PASSWORD --app [heroku-app-name]

### Prerequisites

Set up deployment branches with

    git remote add sandbox git@heroku.com:pebblecode-sandbox.git
    git remote add staging git@heroku.com:pebblecode-staging.git
    git remote add production git@heroku.com:pebblecode.git

### Sandbox

The sandbox site (http://pebblecode-sandbox.herokuapp.com/) is intended to be a temporary site to show particular changes. It is used when you don't intend to push the change to staging or production, but want to show someone else.

To push to the sandbox

    rake sandbox[branch-name]

This is just an alias for

    git push -f sandbox [branch-name]:master

**Note: You will need to run `git remote add sandbox git@heroku.com:pebblecode-sandbox.git` if the sandbox branch has not already been set up**

#### Initial set up

Only needs to be done once, when setting up the heroku site

    heroku create pebblecode-sandbox --stack cedar --remote sandbox
    heroku config:add RACK_ENV=staging --app pebblecode-sandbox

### Staging

The staging site (http://pebblecode-staging.herokuapp.com/) is intended as a staging ground for changes before they go into production. It is a place for sanity checks before it goes live.

To deploy the master branch to staging

	  rake shipit[staging]

**Note: If you want to push changes that won't be going into production any time soon, push into the sandbox site instead**

#### Initial set up

Only needs to be done once, when setting up the heroku site

    heroku create pebblecode-staging --stack cedar --remote staging
    heroku config:add RACK_ENV=staging --app pebblecode-staging

### Production

The [production site](http://pebblecode.com/) is the live public facing site for all the world to see.

To deploy the master branch to production

    rake shipit[production]

This merges the master branch to the production branch, pushes to origin, deploys to production, and checkouts out the master branch.

### Maintenance mode

To turn on/off maintenance mode on heroku

    heroku maintenance:on --app [app]
    heroku maintenance:off --app [app]

## Setting up the Tumblr blog

To edit the tumblr blog:

1. Edit the local file at `/views/tumblr_template/template.html`. This file is in the [tumblr template format](http://www.tumblr.com/docs/en/custom_themes), and special tumblr specific tags. Note the section with `id="staging-message"`, which shows the yellow staging message on the top. Remove this for the production site.
1. Copy and paste the file into the tumblr edit html section, after clicking the `Edit Html` button on:

 * Staging: http://www.tumblr.com/customize/pebblecodestaging
 * Production: http://www.tumblr.com/customize/pebblecode

   Also remember to add in the Disqus code, otherwise the comments won't show. Sometimes the disqus code disappears after editing for some strange reason. The Disqus shortcodes are:

 * Staging: pebblecodestaging
 * Production: pebblecodeblog

1. **(Temporary)** Note that currently **all** references to files (images/css/javascript) are at the location `http://pebblecode.com/v2/`. These files are on the `master` branch. To upload these files:

 * Switch to the `master` branch (or even better, create new local folder with the `master` branch as default)
 * Put the files to the `/public/v2` folder.
   For css files, because sass can't be generated until the `version-2` switch over, the best way to get the plain css is to load the `version-2` site, and copy and paste the generated file into the `master` branch css file.
 * Commit the changes
 * Merge with `production` branch
 * `git push heroku production:master` (Assuming you've added the remote branch: `git remote add heroku git@heroku.com:pebblecode.git`)

1. There is also the `/views/thoughts.erb` file, which is the expanded html version of `/views/tumblr_template/template.html` (without the tumblr tags). You should edit this file manually, as copying pasting from the tumblr template file won't show it properly.
   This is there mainly for testing purposes, when viewing the styles locally.
1. The tumblr blog can be viewed at

 * Staging: http://www.tumblr.com/blog/pebblecodestaging (password: `pebblecodestaging`)
 * Production: http://www.tumblr.com/blog/pebblecode
1. Remember to push the changes to git, so that others have the changed template. **If someone replaces the template on tumblr, there is no version history on tumblr!**


[1]: http://www.sinatrarb.com/
[2]: http://github.com/rtomayko/shotgun/
[3]: http://haml-lang.com/
[4]: http://sass-lang.com/
[5]: http://www.heroku.com/
