(function() {
  'use strict';

  angular
    .module('ea.cv')
    .directive('cefrLevelType', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      // restrict: 'E',
      templateUrl: 'app/components/cv/definitions/cefrLevelType/cefrLevelType.tmpl.html',
      controller: ctrl,
      require:'ngModel',
      link:lnk,
      scope: {
        'ngModel':'=ngModel'
      }
    };

    return directive;

    function lnk(scope,elem,attrs,ngModelCtrl) {
      ngModelCtrl.$formatters.push(function (modelVal) {
        // debugger
        return modelVal;
      })
      ngModelCtrl.$render = function () {
        // debugger
        scope.model = ngModelCtrl.$viewValue;
      }

      scope.$watch('model',function () {
        ngModelCtrl.$setViewValue(scope.model);
      })

      ngModelCtrl.$parsers.push(function (viewVal) {
        return viewVal
      })
    }

    /** @ngInject */
    function ctrl($scope, accountService, toastr) {
      // $scope.cefr = "HI";
      $scope.odabrani = $scope.model;
      $scope.enum = ["A1","A2","B1","B2","C1","C2"];
    }
  }

})();
