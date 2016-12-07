(function() {
  'use strict';

  angular
    .module('ea.workflow')
    .value('duScrollDuration', 1000)
    // .value('duScrollOffset', 30)
    .controller('UserCtrl', ctrl);

  /** @ngInject */
  function ctrl($scope,$http,$location,$anchorScroll,localStorageService,
                smoothScroll,$document,$timeout,
                bsLoadingOverlayService) {

    // bsLoadingOverlayService.start();
    $scope.noIdentification = true;
    $scope.noEducation = true;

    $scope.tabs = [
      {visible: false,heading:'Identification',content:'test identification'},
      {visible: false,heading:'Education',content:'test education'}
    ];

    $scope.pr={
      SkillsPassport:{
        LearnerInfo:{

        }
      }
    };

   // localStorageService.set('test',{huma:true,dina:true});


    $scope.get = function () {
      var lsKeys = localStorageService.keys();
      //debugger;
      if(lsKeys.includes('Identification')){
        $scope.Identification = localStorageService.get('Identification');
        $scope.pr.SkillsPassport.LearnerInfo.Identification = $scope.Identification;
      }
      else {

      }
    }

    $scope.save = function(){
      debugger
      if($scope.Identification!=null &&
        typeof ($scope.Identification)!='undefined'){
        localStorageService.set('Identification',$scope.Identification);
      }
    };

    $scope.addIdentification = function () {
      //alert('d');
      $scope.noIdentification = false;
      $scope.tabs[0].visible = true;
      // $location.hash('idIdentification');
      // $anchorScroll();
      var someElement = angular.element(document.getElementById('idIdentificaiton'));
      $timeout(function(){
        $document.scrollToElementAnimated(someElement);
      },50);
    };

    $scope.addEducation = function () {
      $scope.noEducation = false;
      // $location.hash('idEducation');
      // $anchorScroll();
      var someElement = angular.element(document.getElementById('idEducation'));
      $timeout(function(){
        $document.scrollToElementAnimated(someElement);
      },50);

    }

    $scope.get();
    // $scope.test = 'test';
    // var url = 'http://localhost:9512/api/components';
    // $scope.getTest1 = function () {
    //   $http.get(url)
    //     .then(function(x,y,z,k){
    //       debugger;
    //     })
    //     .catch(function(x,y,z){
    //       debugger;
    //     })
    //   $http({
    //     method:'GET',
    //     url:url
    //   }).then(function(data){
    //     $scope.test1 = data;
    //   }).catch(function (data) {
    //     debugger
    //     $scope.test1 = data;
    //     //alert('error');
    //   })
    // };
    // $scope.getTest2 = function () {
    //   $http({
    //     method:'GET',
    //     url:url+'/5'
    //   }).then(function(data){
    //     // debugger;
    //     $scope.test2 = data;
    //   }).catch(function (data) {
    //     $scope.test2 = data;
    //     // debugger;
    //     // alert('error');
    //   })
    // };
    // $scope.postTest = function () {
    //   $scope.niz = [];
    //   if($scope.komp1) $scope.niz.push($scope.komp1);
    //   if($scope.komp2) $scope.niz.push($scope.komp2);
    //
    //   if($scope.niz.length>0){
    //     $http({
    //       method:'POST',
    //       url:url,
    //       data:$scope.niz
    //     }).then(function(data){
    //
    //     }).catch(function (data) {
    //       alert('error');
    //     })
    //   }
    // }
  }

})();
