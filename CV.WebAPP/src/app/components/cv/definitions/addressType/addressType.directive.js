(function() {
  'use strict';

  angular
    .module('ea.cv')
    .directive('addressType', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      // restrict: 'E',
      templateUrl: 'app/components/cv/definitions/addressType/addressType.tmpl.html',
      controller: ctrl,
      scope: {
        'model':'=model',
        'title':'=title'
      }
    };

    return directive;

    /** @ngInject */
    function ctrl($scope, $http) {

      $scope.odabrani = $scope.model;

      if($scope.odabrani)
        $scope.model = $scope.odabrani;

      $scope.$watch('odabrani',function(){
        if($scope.odabrani)
          $scope.model = $scope.odabrani;
      });

      // $scope.$watch('model',function () {
      //   $scope.odabrani = $scope.model;
      // })
    }
  }

})();
