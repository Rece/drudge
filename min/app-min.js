var rss="http://www.drudgereportfeed.com/rss.xml",contentSource="http://localhost:3000/",app=angular.module("druge",[]),loadingHTML="<div><i class='fa fa-spinner'></i></div>",failedToLoadHTML="<div>Were not perfect!</div>";app.controller("main",["$scope","$http","$sce",function(e,t,o){t.jsonp("http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q="+encodeURIComponent(rss)).success(function(t){e.stories=t.responseData.feed.entries,!e.active&&e.stories.length>0&&e.loadStory(t.responseData.feed.entries[0])}).error(function(){alert("was not able to get a list of stories :(")}),e.loadStory=function(s){e.active!==s&&(e.storyText=o.trustAsHtml(loadingHTML),e.active=s,t.jsonp(contentSource+"?callback=JSON_CALLBACK&url="+encodeURIComponent(e.active.link)).success(function(t){e.storyText=o.trustAsHtml(t.html)}).error(function(){alert("Failed to load the story"),e.storyText=o.trustAsHtml(failedToLoadHTML)}))}}]);