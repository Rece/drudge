var rss="http://www.drudgereportfeed.com/rss.xml",contentSource="http://localhost:3000/",app=angular.module("druge",[]);app.controller("main",["$scope","$http","$sce",function(e,t,o){t.jsonp("http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q="+encodeURIComponent(rss)).success(function(t){e.stories=t.responseData.feed.entries,e.loadStory(t.responseData.feed.entries[0])}).error(function(){alert("was not able to parse the article :(")}),e.loadStory=function(s){e.active=s,t.jsonp(contentSource+"?callback=JSON_CALLBACK&url="+encodeURIComponent(e.active.link)).success(function(t){e.storyText=o.trustAsHtml(t.html)})}}]);