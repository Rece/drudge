/* globals angular, alert, console*/

var rss = "http://www.drudgereportfeed.com/rss.xml";
var contentSource = "http://localhost:3000/";
var app = angular.module('druge', ['ngOnboarding']);

app.controller('main', [
	'$scope',
	'$http',
	'$sce',
	function($scope, $http, $sce){
		$scope.onboarding = false;
		$scope.onboardingSteps = [
			{
			    title: "News Story Feed",
			    position: "right",
			    description: "Here you will find a list of all of the news stories that Druge Report has linked to.",
			    attachTo: "#sidebar",
			    width:300
			},
			{
				title: "Article",
			    position: "left",
			    description: "Over here you will see the news article. Notice it is just the article itself, not any of the other content that gets in the way!",
			    attachTo: "#article",
			    width:300
			},
			{
				title: "Article Link",
			    position: "bottom",
			    description: "If the article doesn't load correctly, you can always click the source link located here",
			    attachTo: "#sourceLink",
			    width:300
			}
		];
		$scope.startOnboarding = function() {
			$scope.onboarding = true;
			console.log("started");
		};

		$scope.loadStories = function() {
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
		};
		
		$scope.loadStory = function(story) {
			if($scope.active === story) {
				//if this is the current story, don't do anything
				return;
			}
			
			//clear out the old article
			$scope.storyText = "";

			//set state flags
			$scope.articleDetectionFailed = false;
			$scope.storyLoading = true;

			//set the selected story to active
			$scope.active = story;

			//ask the server for the data to show
			$http.jsonp(contentSource + '?callback=JSON_CALLBACK&url=' + encodeURIComponent($scope.active.link))
				.success(function(data) {
					$scope.storyLoading = false;
					$scope.storyText = $sce.trustAsHtml(data.html);
				})
				.error(function() {
					$scope.storyLoading = false;
					$scope.articleDetectionFailed = true;
				});
		};

		$scope.loadStories();
	}
]);