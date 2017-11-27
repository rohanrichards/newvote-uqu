'use strict';

angular.module('core').directive('solutionList', ['$timeout', function ($timeout) {
	return {
		restrict: 'E',
		scope: {
			solutions: '=',
			goalId: '=',
			issueId: '='
		},
		templateUrl: 'modules/core/client/views/solutions-list.client.view.html',
		bindToController: true,
		controllerAs: 'vm',
		controller: ['$scope', '$window', 'VoteService', 'SortService', 'Authentication', 'SocialshareService', 'RegionService', 'GoalService', 'SolutionService',
			function ($scope, $window, VoteService, SortService, Authentication, SocialshareService, RegionService, GoalService, SolutionService) {
				var vm = this;
				vm.sortSvc = SortService;
				vm.regions = [];
				$scope.authentication = Authentication;
				vm.goal = {};

				vm.$onInit = function() {
					if(vm.goalId){
						GoalService.get(vm.goalId).then(function(goal) {
							vm.goal = goal;
						});
					}
				};

				vm.vote = function (solution, voteType, $event) {
					$event.stopPropagation();
					VoteService.vote(solution, 'solution', voteType).then(function (data) {
						solution.$get();
					});
				};
				vm.sort = function (sortData, $event) {
					if ($event) $event.stopPropagation();
					SortService.setSort('solution', sortData.type, sortData.order);
				};

				vm.share = function (solution, provider) {
					SocialshareService.share({
						provider: provider,
						rel_url: '/solutions/' + solution._id,
						title: solution.title,
						hashtags: solution.tags.join()
					});
				};

				vm.chartLabels = ['Against', 'For'];
				vm.chartOptions = {
					elements: {
						arc: {
							borderWidth: 0
						}
					},
					responsive: true,
					legend: {
						display: false
					}
				};

				vm.searchRegions = function (query) {
					return RegionService.searchRegions(query);
				};

				vm.updateVotes = function (regions) {
					SolutionService.list({
						goalId: vm.goalId ? vm.goalId : null,
						issueId: vm.issueId ? vm.issueId: null,
						regions: regions
					}).then(function (solutions) {
						console.log(solutions);
						vm.solutions = solutions;
					});
				};

				vm.chartColors = [{
					backgroundColor: 'rgba(255,0,0,0.8)',
					pointBackgroundColor: 'rgba(255,0,0,0.5)',
					pointHoverBackgroundColor: 'rgba(255,0,0,0.6)',
					borderColor: 'rgba(255,0,0,0.6)',
					pointBorderColor: 'rgba(255,0,0,0.6)',
					pointHoverBorderColor: 'rgba(255,0,0,0.6)'
				},
				{
					backgroundColor: 'rgba(0,255,0,0.8)',
					pointBackgroundColor: 'rgba(0,255,0,0.5)',
					pointHoverBackgroundColor: 'rgba(77,83,96,1)',
					borderColor: 'rgba(77,83,96,1)',
					pointBorderColor: '#fff',
					pointHoverBorderColor: 'rgba(77,83,96,0.8)'
				}];
			}
		]
	};
}]);
