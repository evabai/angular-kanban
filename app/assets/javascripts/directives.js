'use strict'

/* Directives */

angular.module('kanban.directives', []).
	directive('kbFocus', [function() {
		var FOCUS_CLASS = "ng-focused";
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, element, attrs, ngModel) {
				ngModel.$focused = false;
				element.bind('focus', function(){
					element.addClass(FOCUS_CLASS);
					scope.$apply(function() {ngModel.$focused = true;});
				}).bind('blur', function() {
					element.removeClass(FOCUS_CLASS);
					scope.$apply(function() {ngModel.$focused = false;});
				});
			}
		}
	}]);
