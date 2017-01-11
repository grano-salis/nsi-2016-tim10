(function() {
  'use strict';

  angular
    .module('ea.cv')
    .directive('linguistic', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      // restrict: 'E',
      templateUrl: 'app/components/cv/skillsPassport/learnerInfo/skills/linguistic/linguistic.tmpl.html',
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
    function ctrl($scope) {
      $scope.model = $scope.model;

      $scope.model = $scope.model;

      if($scope.model)
        $scope.model = $scope.model;

      $scope.$watch('model',function(){
        if($scope.model)
          $scope.model = $scope.model;
      });
    }
  }

})();
