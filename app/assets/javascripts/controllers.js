'use strict'

/* Controllers */
angular.module('kanban.controllers', []).
	controller('TasksController', ['$scope', function($scope) {
		$scope.containers = [{id: 1, title: "Icebox"}, {id: 2, title: "Summer"}, {id: 3, title: "Milestone"}];
		angular.forEach($scope.containers, function(value, idx) {
			eval("$scope.tasksCont" + idx + " = [];");
		});
		$scope.newtask = {};
		$scope.newContainer = {}
		
		$scope.addNewTask = function() {
			var container = this.newtask.container;
			if(container != undefined){
				var mvToContainer = eval('$scope.tasksCont' + container);
				mvToContainer.push(this.newtask);
				$scope.newtask = {};
			}
		}
		
		$scope.addNewContainer = function() {
			$scope.containers.push({id: 4, title: "Sample1"});
		}
		
		$scope.deleteTask = function(idx, container) {
			if(!confirm("Are you sure?")) return false;
			var delFromContainer = eval('$scope.tasksCont' + container);
			if(delFromContainer != undefined) {
				delFromContainer.splice(idx, 1);
			}
		}
		
	}]);
