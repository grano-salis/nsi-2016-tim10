(function() {
  'use strict';

  angular
    .module('ea.cv')
    .directive('computerCertificate', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      // restrict: 'E',
      templateUrl: 'app/components/cv/skillsPassport/learnerInfo/skills/computer/computerCertificate/computerCertificate.tmpl.html',
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

      $scope.addNew = function () {
        if($scope.model==null || typeof ($scope.model)=='undefined')
          $scope.model = [];
        $scope.model.push($scope.add);
        $scope.add=null;
      }

      $scope.delete = function(i){
        $scope.model.splice(i,1);
      }

      $scope.enum = ["A","B","C","D","A1","B1","C1","D1","BE","CE", "DE", "C1E","D1E"];

      if($scope.model)
        $scope.model = $scope.model;

      $scope.$watch('model',function(){
        if($scope.model)
          $scope.model = $scope.model;
      });
    }
  }

})();
