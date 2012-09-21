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

	rake shipit[staging]

#### Initial set up

Only needs to be done once

    heroku create pebblecode-staging --stack cedar --remote staging
    heroku config:add RACK_ENV=staging --app pebblecode-staging

### Ship it!

To deploy master branch to production

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
