(function() {
  'use strict';

  angular
    .module('ea.cv')
    .directive('fileDataType', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      // restrict: 'E',
      templateUrl: 'app/components/cv/definitions/fileDataType/fileDataType.tmpl.html',
      controller: ctrl,
      scope: {
        'model':'=model',
        'title':'=title'
      }
    };

    return directive;

    /** @ngInject */
    function ctrl($scope, $http) {


      if($scope.odabrani)
        $scope.model = $scope.odabrani;

      $scope.$watch('odabrani',function(){
        if($scope.odabrani)
          $scope.model = $scope.odabrani;
      });
    }
  }

})();
