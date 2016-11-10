(function() {
  'use strict';

  angular
    .module('ea.cv')
    .directive('structuredDateType', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      // restrict: 'E',
      templateUrl: 'app/components/cv/definitions/structuredDateType/structuredDateType.tmpl.html',

      controller: ctrl,
      scope: {
        'model':'=model',
        'title':'=title'
      }
    };

    return directive;

    /** @ngInject */
    function ctrl($scope, accountService, toastr) {
      $scope.odabrani = {};
      $scope.dt={};

      $scope.$watch('dt',function(){
        $scope.odabrani.Month = $scope.dt.getMonth()+1; //Because function getMonth returns values between 0-11
        $scope.odabrani.Day = $scope.dt.getDate()
        $scope.odabrani.Year = $scope.dt.getFullYear();
      })



      if($scope.odabrani)
        $scope.model = $scope.odabrani;

      $scope.$watch('odabrani',function(){
        if($scope.odabrani)
          $scope.model = $scope.odabrani;
      });
    }
  }

})();
