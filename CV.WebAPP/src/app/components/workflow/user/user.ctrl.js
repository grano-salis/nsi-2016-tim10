(function() {
  'use strict';

  angular
    .module('ea.workflow')
    .value('duScrollDuration', 1000)
    // .value('duScrollOffset', 30)
    .controller('UserCtrl', ctrl);

  /** @ngInject */
  function ctrl($scope,$http,$location,$anchorScroll,localStorageService,$uibModal,
                smoothScroll,$document,$timeout,loginService, apiService,toastr,
                bsLoadingOverlayService) {
    debugger


    $scope.init = function () {
      $scope.old = {};
      $scope.no={};
      $scope.no.Identification = true;
      $scope.no.Education = true;
      loginService.setUserDummy();
      var componente = apiService.getUserComponents();

      $scope.components = {};
      angular.forEach(componente.components,function (value,key) {
        //value.title
        $scope.components[value.title] = value.data;
        $scope.no[value.title] = false;
      });
      $scope.old = angular.copy($scope.components);
      if(typeof $scope.old.Identification==='undefined')
        $scope.old.Identification={};
      if(typeof $scope.old.Education==='undefined')
        $scope.old.Education={};
    }

    $scope.init();
    //$scope.observer = {Identification:jsonpatch.observe($scope.componente)};
    //$scope.patches = null;

    // if(typeof $scope.components["Identification"]!='undefined')
    //   $scope.noIdentification = false;

    $scope.saveDrafts = function () {
      $scope.patches = {
        Identification:[],
        Education:[]
      };
      if($scope.components.Identification)
        $scope.patches.Identification = jsonpatch.compare($scope.old.Identification,$scope.components.Identification);
      if($scope.components.Education)
        $scope.patches.Education = jsonpatch.compare($scope.old.Education,$scope.components.Education);
      var draft = [];
      angular.forEach($scope.components,function (value,key) {
        if($scope.patches[key].length>0){
          var obj={
            title:key,
            data:value
          };
          this.push(obj);
        }
      },draft);
      debugger;
      apiService.saveUserDrafts(loginService.getCurrentUser().id,draft);
      $scope.init();
      toastr.info('Promjene poslane na potvrdu!');
    }
    // var values = {name: 'misko', gender: 'male'};
    // var log = [];
    // angular.forEach(values, function(value, key) {
    //   this.push(key + ': ' + value);
    // }, log);
    // expect(log).toEqual(['name: misko', 'gender: male']);

    // bsLoadingOverlayService.start();


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

    $scope.openExport = function () {
      // var parentElem = parentSelector ?
      //   angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
      var modalInstance = $uibModal.open({
        // animation: $ctrl.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'export.tmpl.html',
        controller: function ($scope,$http,$uibModalInstance,pr,old) {
          var componente = old;
          $scope.pr=pr;
          angular.forEach(componente,function (value,key) {
            debugger;
            // this[key]=value;
          },$scope.pr.SkillsPassport.LearnerInfo);

          $scope.pr.SkillsPassport.LearnerInfo['Identification']=componente['Identification'];
          $scope.pr.SkillsPassport.LearnerInfo['Education']=componente['Education'];


          $scope.send = function(){

            // for testing purposes
            // $scope.test.SkillsPassport.LearnerInfo = $scope.pr.SkillsPassport.LearnerInfo;
            $http({
              method: 'POST',
              url: 'https://europass.cedefop.europa.eu/rest/v1/document/to/pdf',
              headers: {
                'Content-Type': 'application/json'
              },
              data: $scope.pr,
              responseType: 'arraybuffer'

            }).then(function successCallback(response) {

              debugger;
              var file = new Blob([response.data], {
                type: 'application/pdf'
              })

              var fileURL = URL.createObjectURL(file);
              var a = document.createElement('a');
              a.href = fileURL;
              a.target = '_blank';
              a.download = 'test.pdf';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);

            }, function errorCallback(response,x,y,z,k) {
              debugger;
            })
          };

          $scope.ok = function () {
            //$uibModalInstance.close($ctrl.selected.item);
            debugger;
            //alert('yo');
            $scope.send();
            $uibModalInstance.close();
          };

          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };
        },
        controllerAs: '$ctrl',
        // size: size,
        // appendTo: parentElem,
        resolve: {
          pr: function () {
            return $scope.pr;
          },
          old:function () {
            return $scope.old;
          }
        }
      });

      modalInstance.result.then(function () {
        //$ctrl.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
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
      //debugger
      if($scope.Identification!=null &&
        typeof ($scope.Identification)!='undefined'){
        localStorageService.set('Identification',$scope.Identification);
      }
    };

    $scope.addIdentification = function () {
      //alert('d');
      $scope.no.Identification = false;
      $scope.tabs[0].visible = true;
      // $location.hash('idIdentification');
      // $anchorScroll();
      var someElement = angular.element(document.getElementById('idIdentificaiton'));
      $timeout(function(){
        $document.scrollToElementAnimated(someElement);
      },50);
    };

    $scope.addEducation = function () {
      $scope.no.Education = false;
      // $location.hash('idEducation');
      // $anchorScroll();
      var someElement = angular.element(document.getElementById('idEducation'));
      $timeout(function(){
        $document.scrollToElementAnimated(someElement);
      },50);

    }

    $scope.export = function(){

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
