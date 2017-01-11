(function() {
  'use strict';

  angular
    .module('ea.cv')
    .directive('level', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      // restrict: 'E',
      templateUrl: 'app/components/cv/skillsPassport/learnerInfo/education/level/level.tmpl.html',
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
      $scope.model = $scope.model;

      $scope.eqf = [
        {Label:"EQF level 1",Code:"1"},
        {Label:"EQF level 2",Code:"2"},
        {Label:"EQF level 3",Code:"3"},
        {Label:"EQF level 4",Code:"4"},
        {Label:"EQF level 5",Code:"5"},
        {Label:"EQF level 6",Code:"6"},
        {Label:"EQF level 7",Code:"7"},
        {Label:"EQF level 8",Code:"8"}
      ];


      if($scope.model)
        $scope.model = $scope.model;

      $scope.$watch('model',function(){
        if($scope.model)
          $scope.model = $scope.model;
      });
    }
  }

})();
