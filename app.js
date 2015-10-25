/* globals angular*/

var rss = "http://www.drudgereportfeed.com/rss.xml";
var app = angular.module('druge', []);

app.controller('main', [
	'$scope',
	'$http',
	'$sce',
	function($scope, $http, $sce){
		$http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(rss))
			.success(function(data){
				$scope.stories = data.responseData.feed.entries;
				$scope.loadStory(data.responseData.feed.entries[0]); //set the first story to active
			});
		
		$scope.loadStory = function(story) {
			$scope.active = story;
			$http.jsonp('http://localhost:3000/?callback=JSON_CALLBACK&url=' + encodeURIComponent($scope.active.link))
				.success(function(data) {
					$scope.storyText = $sce.trustAsHtml(data.html);
				});
		};
	}
]);