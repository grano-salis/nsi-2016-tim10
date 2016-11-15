(function() {
  'use strict';

  angular
    .module('ea.workflow')
    .controller('UserCtrl', ctrl);

  /** @ngInject */
  function ctrl($scope,$http) {
    $scope.test = 'test';
    var url = 'localhost';
    $scope.getTest1 = function () {
      $http({
        method:'GET',
        url:url
      }).then(function(data){

      }).catch(function (data) {
        alert('error');
      })
    };
    $scope.getTest2 = function () {
      $http({
        method:'GET',
        url:url
      }).then(function(data){

      }).catch(function (data) {
        alert('error');
      })
    };
    $scope.postTest = function () {
      $scope.niz = [];
      if($scope.komp1) $scope.niz.push($scope.komp1);
      if($scope.komp2) $scope.niz.push($scope.komp2);

      if($scope.niz.length>0){
        $http({
          method:'POST',
          url:url,
          data:$scope.niz
        }).then(function(data){

        }).catch(function (data) {
          alert('error');
        })
      }
    }
  }

})();
