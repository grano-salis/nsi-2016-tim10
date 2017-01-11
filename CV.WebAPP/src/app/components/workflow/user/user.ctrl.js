(function() {
  'use strict';

  angular
    .module('ea.workflow')
    .value('duScrollDuration', 1000)
    .value('duScrollOffset', 50)
    .controller('UserCtrl', ctrl);

  /** @ngInject */
  function ctrl($scope,$http,$location,$anchorScroll,localStorageService,$uibModal,
                smoothScroll,$document,$timeout,loginService, apiService,toastr,authService,
                bsLoadingOverlayService) {
    debugger
    loginService.setUserDummy();

    $scope.init = function () {

      $scope.old = {};
      $scope.no={};
      $scope.no.Identification = true;
      $scope.no.Education = true;
      $scope.no.Skills = true;
      $scope.no.WorkExperience = true;
      $scope.no.Achievement = true;
      loginService.setUserDummy();

      $scope.drafts={};
      apiService.getConfirmedDrafts()
        .then(function (data) {
          debugger
          angular.forEach(data,function (value,key) {
            //value.title
            $scope.drafts[value.title] = value.data;
            $scope.no[value.title] = false;
          });
        },function (error) {
          debugger
        })

      // var componente = apiService.getUserComponents();
      // var draftovi = apiService.getUserDrafts();
      //
      // $scope.components = {};
      //
      // $scope.currentDraft = {};
      //
      // // angular.forEach(componente.components,function (value,key) {
      // //   //value.title
      // //   $scope.components[value.title] = value.data;
      // //   $scope.drafts[value.title] = value.data;
      // //   $scope.no[value.title] = false;
      // // });
      // //
      // // angular.forEach(draftovi.components,function (value,key) {
      // //   //value.title
      // //   $scope.drafts[value.title] = value.data;
      // //   $scope.no[value.title] = false;
      // // });
      //
      // $scope.old = angular.copy($scope.components);
      // if(typeof $scope.old.Identification==='undefined')
      //   $scope.old.Identification={};
      // if(typeof $scope.old.Education==='undefined')
      //   $scope.old.Education={};
      // if(typeof $scope.old.Skills==='undefined')
      //   $scope.old.Skills={};
      // if(typeof $scope.old.Achievement==='undefined')
      //   $scope.old.Achievement={};
      // if(typeof $scope.old.WorkExperience==='undefined')
      //   $scope.old.WorkExperience={};
    }

    $scope.init();
    //$scope.observer = {Identification:jsonpatch.observe($scope.componente)};
    //$scope.patches = null;

    // if(typeof $scope.components["Identification"]!='undefined')
    //   $scope.noIdentification = false;

    $scope.saveDrafts = function () {
      // $scope.patches = {
      //   Identification:[],
      //   Education:[],
      //   Skills:[],
      //   WorkExperience: [],
      //   Achievement: []
      // };
      // if($scope.drafts.Identification)
      //   $scope.patches.Identification = jsonpatch.compare($scope.old.Identification,$scope.drafts.Identification);
      //
      // if($scope.drafts.Education)
      //   $scope.patches.Education = jsonpatch.compare($scope.old.Education,$scope.drafts.Education);
      //
      // if($scope.drafts.Skills)
      //   $scope.patches.Skills = jsonpatch.compare($scope.old.Skills,$scope.drafts.Skills);
      //
      // if($scope.drafts.WorkExperience)
      //   $scope.patches.WorkExperience = jsonpatch.compare($scope.old.WorkExperience,$scope.drafts.WorkExperience);
      //
      // if($scope.drafts.Achievement)
      //   $scope.patches.Achievement = jsonpatch.compare($scope.old.Achievement,$scope.drafts.Achievement);
      //

      var draft = [];
      angular.forEach($scope.drafts,function (value,key) {
        // if($scope.patches[key].length>0){
          var obj={
            title:key,
            data:value
          };
          this.push(obj);
        //}
      },draft);
      debugger;
      apiService.saveUserDrafts(loginService.getCurrentUser(),draft);
      //$scope.init();
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
        controller: function ($scope,$http,$uibModalInstance,pr,old,$log,apiService) {

          apiService.getExportDrafts().then(function(data){
            debugger;
            angular.forEach(data,function (value,key) {
              //value.title
              $scope.pr.SkillsPassport.LearnerInfo[value.title] = value.data;
              // $scope.no[value.title] = false;
            });
            // $scope.pr.SkillsPassport.LearnerInfo['Identification']=componente['Identification'];
            // $scope.pr.SkillsPassport.LearnerInfo['Education']=componente['Education'];
            // $scope.pr.SkillsPassport.LearnerInfo['Skills']=componente['Skills'];
            // $scope.pr.SkillsPassport.LearnerInfo['Achievement']=componente['Achievement'];
            // $scope.pr.SkillsPassport.LearnerInfo['WorkExperience']=componente['WorkExperience'];
          },function (error) {
            debugger
          })

          debugger
          var componente = old;
          $scope.pr=pr;
          // angular.forEach(componente,function (value,key) {
          //   debugger;
          //   // this[key]=value;
          // },$scope.pr.SkillsPassport.LearnerInfo);

          // if(componente['Identification']!={})
          //   $scope.pr.SkillsPassport.LearnerInfo['Identification']=componente['Identification'];
          //
          // // if(componente['Education']!={})
          //   $scope.pr.SkillsPassport.LearnerInfo['Education']=componente['Education'];
          //
          // // if(componente['Skills'])
          //   $scope.pr.SkillsPassport.LearnerInfo['Skills']=componente['Skills'];
          //
          // $scope.pr.SkillsPassport.LearnerInfo['Achievement']=componente['Achievement'];
          // $scope.pr.SkillsPassport.LearnerInfo['WorkExperience']=componente['WorkExperience'];

          $log.debug($scope.pr);

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
              //alert(response);
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
            return $scope.components;
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

    $scope.addSkills = function () {
      $scope.no.Skills = false;
      // $location.hash('idEducation');
      // $anchorScroll();
      var someElement = angular.element(document.getElementById('idSkills'));
      $timeout(function(){
        $document.scrollToElementAnimated(someElement);
      },50);

    }

    $scope.addWorkExperience = function () {
      $scope.no.WorkExperience = false;
      // $location.hash('idEducation');
      // $anchorScroll();
      var someElement = angular.element(document.getElementById('idWorkExperience'));
      $timeout(function(){
        $document.scrollToElementAnimated(someElement);
      },50);
    }

    $scope.addAchievement = function () {
      $scope.no.Achievement = false;
      // $location.hash('idEducation');
      // $anchorScroll();
      var someElement = angular.element(document.getElementById('idAchievement'));
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
