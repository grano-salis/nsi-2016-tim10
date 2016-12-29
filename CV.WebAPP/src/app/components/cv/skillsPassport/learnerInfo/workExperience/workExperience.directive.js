(function() {
  'use strict';

  angular
    .module('ea.cv')
    .directive('workExperience', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      // restrict: 'E',
      templateUrl: 'app/components/cv/skillsPassport/learnerInfo/workExperience/workExperience.tmpl.html',
      controller: ctrl,
      scope: {
        'model':'=model'
      }
    };

    return directive;

    /** @ngInject */
    function ctrl($scope,$uibModal,$log) {
      $scope.odabrani = $scope.model;

      var openModal = function (model,func) {
        var modalInstance = $uibModal.open({
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'app/components/cv/skillsPassport/learnerInfo/workExperience/workExperienceModal.tmpl.html',
          controller: function ($scope,$uibModalInstance,model) {
            $scope.model = model;

            $scope.ok = function () {
              //$uibModalInstance.close($ctrl.selected.item);
              debugger;
              //alert('yo');
              // $scope.send();
              $uibModalInstance.close($scope.model);
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };
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

      $scope.placeholder = function (obj) {
        var t =  "Period: " +
          obj.Period.From.Year + "/" +
          obj.Period.From.Month + "/" +
          obj.Period.From.Day + " - " +
          obj.Period.To.Year + "/" +
          obj.Period.To.Month + "/" +
          obj.Period.To.Day +
          obj.Activities ? ("Activities: " + obj.Activities):'' +
          obj.Employer ? (obj.Employer.Sector.Label + " | " +
          obj.Employer.Name):"";
        return t;
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
