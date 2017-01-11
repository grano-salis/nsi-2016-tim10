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
      require:'ngModel',
      link:lnk,
      scope: {
        'ngModel':'=ngModel'
      }
    };

    return directive;

    function lnk(scope,elem,attrs,ngModelCtrl) {
      ngModelCtrl.$formatters.push(function (modelVal) {
        // debugger
        return modelVal;
      })
      ngModelCtrl.$render = function () {
        // debugger
        scope.model = ngModelCtrl.$viewValue;
      }

      scope.$watch('model',function () {
        ngModelCtrl.$setViewValue(scope.model);
      })

      ngModelCtrl.$parsers.push(function (viewVal) {
        return viewVal
      })
    }

    /** @ngInject */
    function ctrl($scope,$uibModal,$log) {
      $scope.model = $scope.model;

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
          if($scope.model==null || typeof ($scope.model)=='undefined')
            $scope.model = [];

          $scope.model.push(add);
        });

      };

      $scope.editModal=function($index){
        openModal($scope.model[$index],function (edit) {
          $scope.model[$index]=edit;
        });
      }

      $scope.delete = function($index){
        $scope.model.splice($index);
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

      if($scope.model)
        $scope.model = $scope.model;

      $scope.$watch('model',function(){
        if($scope.model)
          $scope.model = $scope.model;
      });
    }
  }

})();
