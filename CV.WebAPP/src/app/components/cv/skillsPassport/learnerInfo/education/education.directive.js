(function() {
  'use strict';

  angular
    .module('ea.cv')
    .directive('education', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      // restrict: 'E',
      templateUrl: 'app/components/cv/skillsPassport/learnerInfo/education/education.tmpl.html',
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
      /*za dodavanje vise edukacija*/
      $scope.addNew = function () {
        if($scope.model==null || typeof ($scope.model)=='undefined')
          $scope.model = [];
        $scope.model.push($scope.add);
        // document.getElementById("education-title").value = "";
        // document.getElementById("education-level").value = "";

        $scope.add=null;
      }


      if($scope.model)
        $scope.model = $scope.model;

      $scope.$watch('model',function(){
        if($scope.model)
          $scope.model = $scope.model;
      });
    }
  }

})();
