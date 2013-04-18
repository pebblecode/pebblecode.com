# encoding: utf-8
class Project

  # :title = the title of the project
  # :description = (short) description of the project
  # :date = month and year project was released (E.g. Febuary 2012)
  # :pebblers = who created the project
  # :github = url of the project on github
  # :live_link = link to a live demo of project (if it exsits)
  # :bloglink = url of blog post relating to project (if applicatble)
  # :blogtext = text for blog link (if applicatble)
  # :image = an image for the project (if applicatble)
  @projects = [
    {
      :title => "Tricklr",
      :description => "Stay active on Twitter without having to monitor it constantly. Put your tweets in a queue and Tricklr will send them for you at regular intervals.",
      :date => "Dec 2011",
      :pebblers => "George, Tak, and Mark",
      :type => "product",
      :live_link => "http://tricklrapp.com/",
      :bloglink => "http://blog.pebblecode.com/post/15777853652/tricklr-1-0",
      :blogtext => "Tricklr 1.0 : blog post",
      :image => "/images/projects/tricklr.jpg"
    },
    {
      :title => "Noisy URIs",
      :description => "Ready-made noise images as data URIs. Available in Sass, LESS, and vanilla CSS flavours.",
      :date => "Febuary 2013",
      :pebblers => "Mark",
      :type => "ten-time",
      :github => "https://github.com/markdurrant/noisy-uris",
      :live_link => "http://markdurrant.github.com/noisy-uris/",
      :bloglink => "http://blog.pebblecode.com/post/43139609779/noisy-uris",
      :blogtext => "Noisy URIs : blog post",
      :image => "/images/projects/noise.jpg"
    },
    {
      :title => "Vistazo",
      :description => "Track what everyone in your team is working on and when. Visualise people's workloads at a glance, without getting sucked into micromanagement.",
      :date => "April 2012",
      :pebblers => "Tak and Mark",
      :type => "product",
      :live_link => "http://vistazoapp.com/",
      :bloglink => "http://blog.pebblecode.com/post/21434355185/vistazo-the-making-of-our-new-baby",
      :blogtext => "The making of our new baby : blog post",
      :image => "/images/projects/vistazo.jpg"
    },
    {
      :title => "WTF",
      :description => "WTF is a simple image guessing game. It supports guessing cities and movies. It uses the flickr api for getting images.",
      :date => "October 2012",
      :type => "games",
      :pebblers => "Tak and Matt",
      :live_link => "http://pebblecode.github.com/wtf/",
      :github => "https://github.com/pebblecode/wtf/",
      :bloglink => "http://blog.pebblecode.com/post/33705863399/games-hack-day",
      :blogtext => "part of the pebble games hackday : blog post",
    },
    {
      :title => "Keyboard Demon",
      :description => "Keyboard Demon is a simple keyboard based game about mashing keys as quickly as possible. Based on <a href='http://hackertyper.net/'>hacker typer</a>.",
      :date => "October 2012",
      :pebblers => "Mark and Vince",
      :type => "games",
      :bloglink => "http://blog.pebblecode.com/post/33705863399/games-hack-day",
      :blogtext => "part of the pebble games hackday : blog post",
      :image => "/images/projects/keyboard-demon.jpg"
    },
    {
      :title => "Battleships",
      :description => "Hack-ships is an extended idea of Battleships, instead of a square board on a plane surface we've chosen to play the game on a Google map.",
      :date => "October 2012",
      :pebblers => "Joseph, Akash, Sava, and Toby",
      :type => "games",
      :bloglink => "http://blog.pebblecode.com/post/33705863399/games-hack-day",
      :blogtext => "part of the pebble games hackday : blog post",
    },
    {
      :title => "Hangover hunt",
      :description => "The player is asked a series of questions. They have to go to the location (a pub!) and answer the question with either location specific information or using location data from their browser or phone.",
      :date => "October 2012",
      :pebblers => "Daniel, Tom, and Plamen",
      :type => "games",
      :github => "https://github.com/pebblecode/hangover-hunt",
      :bloglink => "http://blog.pebblecode.com/post/33705863399/games-hack-day",
      :blogtext => "part of the pebble games hackday : blog post",
    },
    {
      :title => "Campfire quiz",
      :date => "October 2012",
      :description => "A quiz gameplay engine for <a href='http://campfirenow.com/'>campfire</a>.",
      :pebblers => "Alex and James",
      :type => "games",
      :bloglink => "http://blog.pebblecode.com/post/33705863399/games-hack-day",
      :blogtext => "part of the pebble games hackday : blog post",
    },
    {
      :title => "pebble custom reset",
      :date => "August 2012",
      :description => "pebble custom reset uses Sass to compile a custom reset based on Eric Meyer's <a href='http://meyerweb.com/eric/tools/css/reset/'>CSS reset</a> with a few additions.",
      :pebblers => "Mark",
      :type => "ten-time",
      :live_link => "http://pebblecode.github.com/PCR/",
      :github => "https://github.com/pebblecode/PCR",
      :bloglink => "http://blog.pebblecode.com/post/29614270562/the-great-css-experiment",
      :blogtext => "pebble custom reset blog post : blog post",
    },
    {
      :title => "Olympic data vis",
      :description => "Data visualisation of all past olympic medals won",
      :date => "July 2012",
      :pebblers => "Alex and Tak",
      :type => "olympic",
      :live_link => "http://pebblecode.com/olympic-data-vis",
      :bloglink => "http://blog.pebblecode.com/post/27976232997/olympics-hackery",
      :blogtext => "Olympics hack day : blog post",
    },
    {
      :title => "Fear the IOC",
      :description => "Fear the IOC (International Olympic Committee) is a bookmarklet that censors any text or images that the IOC may find litigious.",
      :date => "April 2012",
      :pebblers => "Mark",
      :type => "olympic",
      :github => "https://github.com/pebblecode/fear-the-IOC/",
      :live_link => "http://pebblecode.github.com/fear-the-IOC/",
      :bloglink => "http://blog.pebblecode.com/post/21838814065/hack-day-live",
      :blogtext => "part of the pebble olympics hackday : blog post",
      :image => "/images/projects/fear.jpg"
    }
  ]

  # def has_live_link

  def self.all
    @projects
  end

end