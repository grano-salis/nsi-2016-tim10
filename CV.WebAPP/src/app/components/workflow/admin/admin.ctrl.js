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
                bsLoadingOverlayService,$window) {

    $scope.init = function(){
      loginService.setUserAdminDummy();
      $scope.componente = apiService.getAllUserComponents();
      $scope.draftovi = apiService.getUserDrafts();


      $scope.components = {};
      $scope.drafts = {};
      angular.forEach($scope.componente.components,function (value,key) {
        //value.title
        $scope.components[value.title] = value.data;
      });
      angular.forEach($scope.draftovi.components,function (value,key) {
        $scope.drafts[value.title] = value.data;
      })
    }

    var jsondiffpatch = $window.jsondiffpatch;
    var jsonDiff = jsondiffpatch.create({
      objectHash:function(obj){
        if(typeof obj._id !=='undefined'){
          return obj._id;
        }
        if(typeof obj.id !== 'undefined'){
          return obj._id;
        }
        if(typeof obj.name !== 'undefined'){
          return obj.name;
        }
        return JSON.stringify(obj);
      },
      arrays:{
        detectMove:true,
        includeValueOnMove:false
      },
      textDiff:{
        minLength:60
      }
    });

    $scope.delta = jsonDiff.diff({huma:true},{huma:false});
    debugger
    //$scope.beautifulHtml = jsonDiff.formatters.html.format($scope.delta, {huma:true});

    // var objA = {user: {firstName: "Albert", lastName: "Einstein"}};
    // var objB = {user: {firstName: "Albert", lastName: "Collins"}};
    // $scope.delta = jsonpatch.compare(objA, objB);

    $scope.init();
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
      debugger;
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
      apiService.saveUserComponents($scope.draftovi.user,components);
    }
    $scope.approve =function(item,userid){
      //alert(item);
      var flag = false;
      angular.forEach($scope.componente.components,function (value,key) {
        debugger;
        if(item.title==value.title){
          value.updated = new Date();
          value.data = item.data;
          flag=true;
          //value.data.updated = new Date();
          //break;
        }
      });

      if(!flag){
        if(typeof $scope.componente.components=='undefined')
          $scope.componente.components = [];
        $scope.componente.components.push(item);
      }

      debugger;
      var components=[];
      angular.forEach($scope.componente.components,function (value,key) {
        var obj = {
          title:value.title,
          data:value.data
        };
        this.push(obj);
      },components);
      apiService.saveUserComponents(userid,components);
      apiService.deleteDraft(userid,item.title);
      $scope.init();
    }
  }

})();
