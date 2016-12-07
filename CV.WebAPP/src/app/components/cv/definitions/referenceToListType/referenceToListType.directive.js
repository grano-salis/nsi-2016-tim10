(function() {
  'use strict';

  angular
    .module('ea.cv')
    .directive('referenceToListType', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      // restrict: 'E',
      templateUrl: 'app/components/cv/definitions/referenceToListType/referenceToListType.tmpl.html',
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
      $scope.addNew = function () {
        if($scope.odabrani==null || typeof ($scope.odabrani)=='undefined')
          $scope.odabrani = [];
        $scope.odabrani.push($scope.add);
        $scope.add=null;
      }

      $scope.delete = function(i){
        $scope.odabrani.splice(i,1);
      }


      if($scope.odabrani)
        $scope.model = $scope.odabrani;

      $scope.$watch('odabrani',function(){
        if($scope.odabrani)
          $scope.model = $scope.odabrani;
      });
    }
  }

})();
