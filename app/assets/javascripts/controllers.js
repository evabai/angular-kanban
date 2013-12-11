'use strict'

/* Controllers */
angular.module('kanban.controllers', []).
	controller('TasksController', ['$scope', function($scope) {
		$scope.containers = [];
		$scope.newtask = {};
		$scope.newContainer = {}
		
		$scope.addNewTask = function() {
			var container = this.newtask.container;
			if(container != undefined){
				var mvToContainer = $scope.$eval('tasksCont' + container);
				this.newtask.id = $scope.$eval('tasksCont' + container).length + 1;
				mvToContainer.push(this.newtask);
				$scope.newtask = {};
			}
		}
		
		$scope.addNewContainer = function() {
			if(this.containers.length >= 3) {
				$scope.add_new_container.$setPristine();
				return false;
			}
			var idx = this.containers.length + 1;
			$scope.containers.push({id: idx, title: this.newContainer.title});
			$scope.$eval("tasksCont" + idx + " = []");
			$scope.add_new_container.$setPristine();
			$scope.newContainer = {};
		}
		
		$scope.deleteTask = function(task) {
			if(!confirm("Are you sure?")) return false;
			var delFromContainer = $scope.$eval('tasksCont' + task.container);
			if(angular.isDefined(delFromContainer)) {
				delFromContainer.splice(delFromContainer.indexOf(task), 1);
			}
		}
		
		$scope.getTasksForCont = function(idx) {
			return $scope.$eval("tasksCont" + idx);
		}
		
		$scope.deleteContainer = function(container) {
			if(!confirm("Are you sure?")) return false;
			var idx = container.id;
			var delContainerTasks = $scope.$eval('tasksCont' + idx);
			if(angular.isDefined(delContainerTasks)) {
				if(delContainerTasks.length > 0) {
					alert("This board already contains tasks. Either remove them or move them to other boards before deleting this board.");
					return false;
				}
				this.containers.splice(this.containers.indexOf(container), 1);
				$scope.add_new_container.$setPristine();
			}
			else {
				alert("This is an invalid operation.");
				return false;
			}
			
			
		}
		
	}]);
