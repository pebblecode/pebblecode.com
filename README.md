# pebble {code} site

This is a simple brochure site written with [express][1], a web framework for [node.js][2]


## Hacking on the site

To hack on the site you need to install node.js. On OSX you can use homebrew

    brew install node

You also need [npm][3] (the package manager for node.js). You can get it using the following one line install:

    curl http://npmjs.org/install.sh | sh

## Installing the site

Once you've cloned the repo change into the directory and run

    npm install

This will install the dependencies

You can then run 
    
    node app.js

To start the server and go to `http://0.0.0.0:3000` to see it

## Automatic reloading

By default files are not reloaded when you change them. There is a tool available for doing this. Install it with

    npm install -g nodemon

Then instead of starting the server with 

    node app.js

Do 

    nodemon app.js

## Views and styling

The files you'll be most concerned with are the view files (under /views) and the stylesheet files (under /public/stylesheets).

The view files are written in [jade][4] and the stylesheets are written in [stylus][5]. There is good documentation on both of the sites.

## Tests

To run tests run 

    expresso

More info on expresso is [here][6]

## Hosting

The site is hosted on [Heroku][7].

To deploy to production

    git push heroku production:master

[1]: http://expressjs.com/
[2]: http://nodejs.org/
[3]: http://npmjs.org/
[4]: http://jade-lang.com/
[5]: http://learnboost.github.com/stylus/
[6]: http://github.com/visionmedia/expresso
[7]: http://www.heroku.com/
