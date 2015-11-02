#A Better Drudge Report
##What is this all about?
There is a news curation site called [Drudge Report](http://www.drudgereport.com/) (http://www.drudgereport.com/). I tend to think they do a pretty good job with their news curation, however I cannot handle their aestetics (seriously - look at their [site](http://www.drudgereport.com/)). This repo is the code that I wrote for a site I made to try to fix this issue. You can see this repo in action [here](http://drudge.probitytechnology.com/).

##Give me the Specs!
 * This is a MEAN(ish) site. 
 * We have an angular front end
 * Bootstrap for our css framework. 
 * There is one little css animation that I'm pulling from [animate.css](https://daneden.github.io/animate.css/)
 * I'm using [ng-onboarding](https://github.com/adamalbrecht/ngOnboarding) for my onboarding tutorial.
 * The backend is Node with Express, but there is really only 1 page, so it hardly counts.
 * The reason it is only MEAN(ish) is because we don't have a MongoDB database (we just don't have a database).
 * I'm pulling my feed of articles that are on drudge from a feedburner RSS feed.
 * I didn't know of any great solution to pulling ONLY the content from websites, so I wrote my own API (with a lot of borrowed code) to parse the article out of a page. You can see it here the article finder repo [here](https://github.com/Rece/articleFinder).

##See it in action
I have a site running this repo at http://drudge.probitytechnology.com/
