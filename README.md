# pebble {code} site

This is a simple brochure site written with [sinatra][1] for [pebble {code}](http://pebblecode.com).

Some of the commands below will not work unless you are part of pebblecode, and have access to the git repo and deployment environments.

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

   To change the port number, run

        rake server[8888]

   If you want run on a local ip address (eg, to test on an external device), run

        rake server[7100,true]

   where the first parameter is the port number.

   Note that you will need to add the IP address to typekit for fonts to show.


## Automatic reloading

To autoload the site, this app uses [shotgun][2], but this is wrapped around the rake task, so nothing needs to be done for it to work.

## Views and styling

The files you'll be most concerned with are the view files (under `/views`) and the stylesheet files (under `/views/stylesheets`).

The view files are written in [haml][3] and the stylesheets are written in [scss][4].

The optimized css is in `/public/build` (see Optimization).

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

To optimize the css/javascript files for production run

    grunt build

Optimized files are generated into `public/build`.

Commit the changes, and the layout file will automatically handle using the built files on non-development environments.

To force the page to use the development js, add `dev` as a query parameter in the url eg, http://localhost:7770?dev

To force the page to use the production js, add `prod` as a query parameter in the url (this also overrides `dev`) eg, http://localhost:7770?prod

## Tests

Uses [rspec](http://rspec.info/) for unit tests and [casperjs](http://casperjs.org/) for integration tests (probably remove one of them in future).

To run all tests (rspec + casper)

    bundle exec rake test:all[server-url]

where `server-url` is the development server url to test on

### RSpec

Run tests with

    bundle exec guard

Also to run it separately

    bundle exec rake spec

To run an individual spec

    bundle exec rake spec:run[filename]

    # eg,
    bundle exec rake spec:run[spec/controllers/application_spec.rb]

The validation spec (`spec/integration/validation_spec.rb`) is ignored by default, as it makes an external call to validation web services. To run validation specs

    bundle exec rake spec:validation

### Casper

Install casper

    brew install casperjs

Run tests

    grunt test --url=server-url

where `server-url` is the development server url to test on

## Deployment

The site is hosted on [Heroku][5].

Development workflow works like this:

* Play around and try new things on [sandbox site](http://pebblecode-sandbox.herokuapp.com/)
* If a feature is something intended for production, develop on a branch and merge into `master` (or just work off `master` directly if it is a small change)
* When master is ready to be show to someone else, push to [staging site](http://pebblecode-staging.herokuapp.com/)
* When `staging` is ready for production, push to [production site](http://pebblecode.com/)

### HTTP password

By default the staging/sandbox sites have a http password.

To disable the password

    # For staging
    bundle exec rake password:disable[staging]

    # For sandbox
    bundle exec rake password:disable[sandbox]

To enable the password

    bundle exec rake password:enable[environment]

To set the password (also see `helpers/http_password.rb` for how it works)

    bundle exec rake password:set[environment,user,password]

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

#### Sitemap

After deployment, you should ping search engines if the pages have been updated. The pages are listed in `spec/support/path.rb`

To do this

1. Generate the changes with

        bundle exec rake sitemap:refresh:no_ping

2. Commit and push updates to production

        bundle exec rake shipit[production]

3. Ping the search engines

        rake sitemap:ping_search_engines

### Seach engine web master tools

* [Google](https://www.google.com/webmasters/tools/dashboard?hl=en&siteUrl=http://www.pebblecode.com/)
* [Bing](https://ssl.bing.com/webmaster/home/dashboard?url=http%3A%2F%2Fwww.pebblecode.com%2F)

### Maintenance mode

To turn on/off maintenance mode on heroku

    heroku maintenance:on --app [app]
    heroku maintenance:off --app [app]

## Tumblr blog updates

There are 2 tumblr blogs for pebblecode:

* Staging
  * Website: [http://pebblecodestaging.tumblr.com/](http://pebblecodestaging.tumblr.com/) (password protected)
  * Tumblr customization: [http://www.tumblr.com/customize/pebblecodestaging](http://www.tumblr.com/customize/pebblecodestaging)
  * Template: `/views/tumblr_template/template-staging.html`
* Production
  * Website: [http://blog.pebblecode.com/](http://blog.pebblecode.com/)
  * Tumblr customization: [http://www.tumblr.com/customize/pebblecode](http://www.tumblr.com/customize/pebblecode)
  * Template: `/views/tumblr_template/template.html`

The difference between the staging and production templates should only be the referenced urls. Staging should use `http://pebblecode-staging.herokuapp.com` and production should use `http://pebblecode.com`.

The process of updating the tumblr blog styles is:

1. Modify the [tumblr edit html section for staging](http://www.tumblr.com/customize/pebblecodestaging) until done with changes
2. Copy and paste the changes into `/views/tumblr_template/template-staging.html`
3. Copy and paste `/views/tumblr_template/template-staging.html` into the production template `/views/tumblr_template/template.html`, and update the urls to `http://pebblecode.com`
4. Update the [tumblr edit html section for production](http://www.tumblr.com/customize/pebblecode)

   Also remember to add in the Disqus code, otherwise the comments won't show. Sometimes the disqus code disappears after editing for some strange reason. The Disqus shortcodes are:

   * Staging: pebblecodestaging
   * Production: pebblecodeblog

5. There is also the `/views/thoughts.erb` file, which is the expanded html version of `/views/tumblr_template/template.html` (without the tumblr tags). You should edit this file manually, as copying pasting from the tumblr template file won't show it properly.

   This is mainly for testing purposes, so styles can be viewed locally.

6. Remember to push the changes to git, so that others have the updated template. **If someone replaces the template on tumblr, there is no version history on tumblr!**


[1]: http://www.sinatrarb.com/
[2]: http://github.com/rtomayko/shotgun/
[3]: http://haml-lang.com/
[4]: http://sass-lang.com/
[5]: http://www.heroku.com/
