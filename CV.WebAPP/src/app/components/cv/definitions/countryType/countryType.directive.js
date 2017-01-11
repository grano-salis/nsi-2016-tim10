(function() {
  'use strict';

  angular
    .module('ea.cv')
    .directive('countryType', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      // restrict: 'E',
      templateUrl: 'app/components/cv/definitions/countryType/countryType.tmpl.html',
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
    function ctrl($scope, $http,xmlAssetsService) {
      xmlAssetsService.getCountriesLangHR()
        .then(function(niz){
          $scope.drzave = niz;
        });

      // $scope.odabrani = $scope.model;
      //
      // // $scope.odabrani = {"Code":"BG","Label":"Bugarska"};
      // if($scope.odabrani)
      //   $scope.model = $scope.odabrani;
      //
      // $scope.$watch('odabrani',function(){
      //   if($scope.odabrani)
      //     $scope.model = $scope.odabrani;
      // });
      // $scope.$watch('model',function () {
      //   $scope.odabrani = $scope.model;
      // })
    }
  }

})();
