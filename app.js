/* globals angular*/

var app = angular.module('druge', []);

app.controller('feed', [
	'$scope',
	'$http',
	function($scope, $http){
		$http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent("http://www.drudgesiren.com/allStories.xml"))
		.success(function(data){
			$scope.stories = data.responseData.feed.entries;
		});
		
		$scope.loadStory = function(link) {
			alert(link);
		};
	}
]);