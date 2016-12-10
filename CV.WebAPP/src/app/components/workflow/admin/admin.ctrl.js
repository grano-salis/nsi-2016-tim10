(function() {
  'use strict';

  angular
    .module('ea.workflow')
    .value('duScrollDuration', 1000)
    // .value('duScrollOffset', 30)
    .controller('adminCtrl', ctrl);

  /** @ngInject */
  function ctrl($scope,$http,$location,$anchorScroll,localStorageService,
                smoothScroll,$document,$timeout,loginService, apiService,
                bsLoadingOverlayService) {

    loginService.setUserAdminDummy();
    var componente = apiService.getUserComponents();
    var draftovi = apiService.getUserDrafts();
    $scope.components = {};
    $scope.drafts = {};
    angular.forEach(componente.components,function (value,key) {
      //value.title
      $scope.components[value.title] = value.data;
    });
    angular.forEach(draftovi.components,function (value,key) {
      $scope.drafts[value.title] = value.data;
    })
    // var saveComponents = function () {
    //   var draft = [];
    //   angular.forEach($scope.components,function (value,key) {
    //     var obj={
    //       title:key,
    //       data:value
    //     };
    //     this.push(obj);
    //   },draft);
    //   debugger;
    //   apiService.saveUserDrafts(loginService.getCurrentUser().id,draft);
    // }
    $scope.approveAll = function(){
      angular.forEach($scope.drafts,function (value,key) {
        this[key]=value;
      },$scope.components)
      var components=[];
      angular.forEach($scope.components,function (value,key) {
        var obj = {
          title:key,
          data:value
        };
        this.push(obj);
      },components);
      apiService.saveUserComponents(draftovi.user,components);
    }

  }

})();
