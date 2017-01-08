(function() {
  'use strict';

  angular
    .module('ea.cv')
    .directive('achievementTitle', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      // restrict: 'E',
      templateUrl: 'app/components/cv/skillsPassport/learnerInfo/achievement/achievementTitle/achievementTitle.tmpl.html',
      controller: ctrl,
      scope: {
        'model':'=model'
      }
    };

    return directive;

    /** @ngInject */
    function ctrl($scope,enumsService) {
      $scope.odabrani = $scope.model;

      $scope.model = $scope.odabrani;

      if($scope.odabrani)
        $scope.model = $scope.odabrani;

      $scope.$watch('odabrani',function(){
        if($scope.odabrani)
          $scope.model = $scope.odabrani;
      });

      $scope.enum = enumsService.get();
    }
  }

})();
