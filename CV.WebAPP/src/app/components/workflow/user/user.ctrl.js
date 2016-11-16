(function() {
  'use strict';

  angular
    .module('ea.workflow')
    .controller('UserCtrl', ctrl);

  /** @ngInject */
  function ctrl($scope,$http) {
    $scope.test = 'test';
    var url = 'http://localhost:9512/api/components';
    $scope.getTest1 = function () {
      $http.get(url)
        .then(function(x,y,z,k){
          debugger;
        })
        .catch(function(x,y,z){
          debugger;
        })
      $http({
        method:'GET',
        url:url
      }).then(function(data){
        $scope.test1 = data;
      }).catch(function (data) {
        debugger
        $scope.test1 = data;
        //alert('error');
      })
    };
    $scope.getTest2 = function () {
      $http({
        method:'GET',
        url:url+'/5'
      }).then(function(data){
        // debugger;
        $scope.test2 = data;
      }).catch(function (data) {
        $scope.test2 = data;
        // debugger;
        // alert('error');
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
