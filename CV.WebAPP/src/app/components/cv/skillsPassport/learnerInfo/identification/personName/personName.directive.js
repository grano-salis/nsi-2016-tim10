(function() {
  'use strict';

  angular
    .module('ea.cv')
    .directive('personName', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      // restrict: 'E',
      templateUrl: 'app/components/cv/skillsPassport/learnerInfo/identification/personName/personName.tmpl.html',
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

      // $scope.odabrani = $scope.model;
      //
      // if($scope.odabrani)
      //   $scope.model = $scope.odabrani;
      //
      // $scope.$watch('odabrani',function(){
      //   //alert('1');
      //   if($scope.odabrani)
      //     $scope.model = $scope.odabrani;
      // });

      // $scope.$watch('model',function () {
      //   $scope.odabrani = $scope.model;
      // })
    }
  }

})();
