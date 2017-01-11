(function() {
  'use strict';

  angular
    .module('ea.cv')
    .directive('websiteType', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      // restrict: 'E',
      templateUrl: 'app/components/cv/definitions/websiteType/websiteType.tmpl.html',

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
      $scope.odabrani = {};

      $scope.odabrani = $scope.model;
      $scope.niz = [
        {Label:"personal-",Code:"personal"},
        {Label:"business-",Code:"business"},
        {Label:"blog-",Code:"blog"},
        {Label:"portfolio-",Code:"portfolio"}
      ];

      if($scope.odabrani)
        $scope.model = $scope.odabrani;

      $scope.$watch('odabrani',function(){
        if($scope.odabrani)
          $scope.model = $scope.odabrani;
      });
    }
  }

})();
