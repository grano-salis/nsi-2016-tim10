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
      scope: {
        'model':'=model',
        'eqf':'=?eqf'
      }
    };

    return directive;

    /** @ngInject */
    function ctrl($scope, accountService, toastr) {
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

      if($scope.odabrani)
        $scope.model = $scope.odabrani;

      $scope.$watch('odabrani',function(){
        if($scope.odabrani)
          $scope.model = $scope.odabrani;
      });
    }
  }

})();
