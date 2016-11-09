(function() {
  'use strict';

  angular
    .module('ea.cv')
    .directive('countryType', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      // restrict: 'E',
      templateUrl: 'app/components/cv/definitions/countryType/countryType.tmpl.html',
      controller: ctrl,
      scope: {
        'model':'=model',
        'title':'=title'
      }
    };

    return directive;

    /** @ngInject */
    function ctrl($scope, $http,xmlAssetsService) {
      xmlAssetsService.getCountriesLangHR()
        .then(function(niz){
          $scope.drzave = niz;
        });


      if($scope.odabrani)
        $scope.model = $scope.odabrani;

      $scope.$watch('odabrani',function(){
        if($scope.odabrani)
          $scope.model = $scope.odabrani;
      });
    }
  }

})();
