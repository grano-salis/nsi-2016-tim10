(function() {
  'use strict';

  angular
    .module('ea.cv')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $httpProvider) {
    console.log("cv.ruta");
    $stateProvider
      // .state('cv',{
      //   url:'/',
      //   abstract:true
      // })
      .state('temp', {
        url: '/',
        templateUrl: 'app/components/cv/cv.tmpl.html',
        controller: function($scope,$http){
          $scope.pr={
            SkillsPassport:{
              LearnerInfo:{

              }
            }
          };

          $scope.arr=[1,2];

          $scope.testDatum = {};



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
        }//,
        // params:{
        //   openModal: true
        // }
      });

    // $httpProvider.interceptors.push('authInterceptor');
    // $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';

  }

})();
