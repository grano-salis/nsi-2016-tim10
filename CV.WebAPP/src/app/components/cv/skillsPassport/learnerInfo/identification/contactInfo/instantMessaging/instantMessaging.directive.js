(function() {
  'use strict';

  angular
    .module('ea.cv')
    .directive('instantMessaging', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      // restrict: 'E',
      templateUrl: 'app/components/cv/skillsPassport/learnerInfo/identification/contactInfo/instantMessaging/instantMessaging.tmpl.html',
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
    function ctrl($scope, $http) {
      $scope.enum = [
        {
          Code:'gtalk',
          Label:'gtalk'
        },{
          Code:'skype',
          Label:'skype'
        },{
          Code:'icq',
          Label:'icq'
        },{
          Code:"aim",
          Label:"Aim"
        },{
          Code:"msn",
          Label:"msn"
        },{
          Code:"yahoo",
          Label:"Yahoo"
        }];

      $scope.odabrani = $scope.model;

      $scope.addNew = function () {
        if($scope.odabrani==null || typeof ($scope.odabrani)=='undefined')
          $scope.odabrani = [];
        $scope.odabrani.push($scope.add);
        $scope.add=null;
      }

      $scope.delete = function(i){
        $scope.odabrani.splice(i,1);
      }


      // if($scope.odabrani)
      //   $scope.model = $scope.odabrani;
      //
      // $scope.$watch('odabrani',function(){
      //   if($scope.odabrani)
      //     $scope.model = $scope.odabrani;
      // });
    }
  }

})();
