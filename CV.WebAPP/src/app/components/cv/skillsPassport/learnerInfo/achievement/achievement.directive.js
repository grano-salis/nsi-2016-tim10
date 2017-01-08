(function() {
  'use strict';

  angular
    .module('ea.cv')
    .directive('achievement', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      // restrict: 'E',
      templateUrl: 'app/components/cv/skillsPassport/learnerInfo/achievement/achievement.tmpl.html',
      controller: ctrl,
      scope: {
        'model':'=model'
      }
    };

    return directive;

    /** @ngInject */
    function ctrl($scope,$uibModal,enumsService) {
      $scope.odabrani = $scope.model;

      $scope.model = $scope.odabrani;

      $scope.addNew = function () {
        if($scope.odabrani==null || typeof ($scope.odabrani)=='undefined')
          $scope.odabrani = [];
        $scope.odabrani.push($scope.add);
        // delete $scope.add;
        // $scope.add={};
      }

      $scope.delete = function(i){
        $scope.odabrani.splice(i,1);
      }

      var openModal = function (model,func) {
        var modalInstance = $uibModal.open({
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'app/components/cv/skillsPassport/learnerInfo/achievement/achievementModal.tmpl.html',
          controller: function ($scope,$uibModalInstance,model,$http) {
            $scope.model = model;
            if(model === null)
              $scope.model = {};

            $scope.importData = {};
            $scope.importSelected = [];

            var tim2 = "http://localhost:26264/" + "/api/Europass/Export/1";

            var getImportData = function () {
              $http.get(tim2)
                .then(function(data){
                  $scope.importData = data.data;
                },function (data) {
                  debugger;
                  alert(data);
                })
            }

            $scope.ok = function () {
              //$uibModalInstance.close($ctrl.selected.item);
              debugger;
              //alert('yo');
              // $scope.send();
              if($scope.importFlag){
                $uibModalInstance.close($scope.importSelected);
              }
              else
                $uibModalInstance.close($scope.model);
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };

            getImportData();
          },
          controllerAs: '$ctrl',
          resolve: {
            model: function () {
              return model;
            }
          }
        });

        modalInstance.result.then(function (newModel) {
          //$ctrl.selected = selectedItem;
          debugger;
          //model = newModel;
          func && func(newModel);
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      }

      $scope.addNewModal = function () {
        var add=null;
        openModal(add,function (add) {
          debugger
          if($scope.odabrani==null || typeof ($scope.odabrani)=='undefined')
            $scope.odabrani = [];

          if(Array.isArray(add)){
            //alert('import');
            enumsService.merge(add);
            var rez = [];
            for(var i =0;i<add.length;i++){
              var o = add[i];
              rez.push({
                Title:{
                  Label: o.criteria.name,
                  Code: o.criteria.name
                },
                Description: o.cV_ITEM.name+': '+o.cV_ITEM.description
              })
              debugger;
            }
            $scope.odabrani.push.apply($scope.odabrani,rez);
          }
          else
            $scope.odabrani.push(add);
        });

      };

      $scope.editModal=function($index){
        openModal($scope.odabrani[$index],function (edit) {
          $scope.odabrani[$index]=edit;
        });
      }

      $scope.delete = function($index){
        $scope.odabrani.splice($index);
      };

      if($scope.odabrani)
        $scope.model = $scope.odabrani;

      $scope.$watch('odabrani',function(){
        if($scope.odabrani)
          $scope.model = $scope.odabrani;
      });
    }
  }

})();
