/* globals angular, alert*/

var rss = "http://www.drudgereportfeed.com/rss.xml";
var contentSource = "http://localhost:3000/";
var app = angular.module('druge', []);
var loadingHTML = "<div><i class='fa fa-spinner'></i></div>";
var failedToLoadHTML = "<div>Were not perfect!</div>";
app.controller('main', [
	'$scope',
	'$http',
	'$sce',
	function($scope, $http, $sce){
		//pull articles from RSS
		$http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(rss))
			.success(function(data){
				//save the stories
				$scope.stories = data.responseData.feed.entries;

				//if there is no active story, and there are stories,
				// then set the first story in the rss feed to active
				if(!$scope.active && $scope.stories.length > 0) {
					$scope.loadStory(data.responseData.feed.entries[0]);
				}
			})
			.error(function() {
				alert("was not able to get a list of stories :(");
			});
		
		$scope.loadStory = function(story) {
			if($scope.active === story) {
				//if this is the current story, don't do anything
				return;
			} 

			//while we we are waiting for the server to respond, show a loading icon
			$scope.storyText = $sce.trustAsHtml(loadingHTML);

			//set the selected story to active
			$scope.active = story;

			//ask the server for the data to show
			$http.jsonp(contentSource + '?callback=JSON_CALLBACK&url=' + encodeURIComponent($scope.active.link))
				.success(function(data) {
					$scope.storyText = $sce.trustAsHtml(data.html);
				})
				.error(function() {
					alert("Failed to load the story");
					$scope.storyText = $sce.trustAsHtml(failedToLoadHTML);
				});
		};
	}
]);