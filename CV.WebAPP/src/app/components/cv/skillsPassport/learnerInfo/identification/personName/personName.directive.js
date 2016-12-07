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
      scope: {
        'model':'=model'
      }
    };

    return directive;

    /** @ngInject */
    function ctrl($scope, accountService, toastr) {
      // $scope.cefr = "HI";

      $scope.odabrani = $scope.model;

      if($scope.odabrani)
        $scope.model = $scope.odabrani;

      $scope.$watch('odabrani',function(){
        //alert('1');
        if($scope.odabrani)
          $scope.model = $scope.odabrani;
      });

      // $scope.$watch('model',function () {
      //   $scope.odabrani = $scope.model;
      // })
    }
  }

})();
