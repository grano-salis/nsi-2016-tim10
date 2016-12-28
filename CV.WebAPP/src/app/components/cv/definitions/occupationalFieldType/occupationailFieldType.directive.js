(function() {
  'use strict';

  angular
    .module('ea.cv')
    .directive('occupationalFieldType', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      // restrict: 'E',
      templateUrl: 'app/components/cv/definitions/occupationalFieldType/occupationalFieldType.tmpl.html',
      controller: ctrl,
      scope: {
        'model':'=model',
        'title':'=title'
      }
    };

    return directive;

    /** @ngInject */
    function ctrl($scope, $http,xmlAssetsService) {
      xmlAssetsService.getOccupationsLangHR()
        .then(function(niz){
          $scope.positions = niz;
        });

      $scope.odabrani = $scope.model;

      if($scope.odabrani)
        $scope.model = $scope.odabrani;

      $scope.$watch('odabrani',function(){
        if($scope.odabrani)
          $scope.model = $scope.odabrani;
      });
    }
  }

})();
