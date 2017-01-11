(function() {
  'use strict';

  angular
    .module('ea.cv')
    .directive('motherTongue', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      // restrict: 'E',
      templateUrl: 'app/components/cv/skillsPassport/learnerInfo/skills/linguistic/motherTongue/motherTongue.tmpl.html',
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
    function ctrl($scope,xmlAssetsService) {
      $scope.model = $scope.model;
      xmlAssetsService.getLanguagesLangHR()
        .then(function(niz){
          $scope.enum = niz;
        });

      $scope.addNew = function () {
        if($scope.model==null || typeof ($scope.model)=='undefined')
          $scope.model = [];
        $scope.model.push($scope.add);
        $scope.add=null;
      }

      $scope.delete = function(i){
        $scope.model.splice(i,1);
      }


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
