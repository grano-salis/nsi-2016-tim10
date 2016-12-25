(function() {
  'use strict';

  angular
    .module('ea.cv')
    .directive('genericSkillType', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      // restrict: 'E',
      templateUrl: 'app/components/cv/definitions/genericSkillType/genericSkillType.tmpl.html',
      controller: ctrl,
      scope: {
        'model':'=model'
      }
    };

    return directive;

    /** @ngInject */
    function ctrl($scope) {
      // $scope.cefr = "HI";

      $scope.odabrani = $scope.model;

      if($scope.odabrani)
        $scope.model = $scope.odabrani;

      $scope.$watch('odabrani',function(){
        if($scope.odabrani)
          $scope.model = $scope.odabrani;
      });

      $scope.$watch('model',function () {
        $scope.odabrani = $scope.model;
      })
    }
  }

})();
