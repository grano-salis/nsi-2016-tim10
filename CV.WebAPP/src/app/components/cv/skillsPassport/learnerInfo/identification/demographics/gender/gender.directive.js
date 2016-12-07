(function() {
  'use strict';

  angular
    .module('ea.cv')
    .directive('gender', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      // restrict: 'E',
      templateUrl: 'app/components/cv/skillsPassport/learnerInfo/identification/demographics/gender/gender.tmpl.html',
      controller: ctrl,
      scope: {
        'model':'=model',
        'title':'=title'
      }
    };

    return directive;

    /** @ngInject */
    function ctrl($scope, $http) {
      //[ "M", "F"]
      $scope.enum = [
        {
          Code:'M',
          Label:'male'
        },{
          Code:'F',
          Label:'fem'
        }];

      $scope.odabrani = $scope.model;

      if($scope.odabrani)
        $scope.model = $scope.odabrani;

      $scope.$watch('odabrani',function(){
        if($scope.odabrani)
          $scope.model = $scope.odabrani;
      });

      // $scope.$watch('model',function(){
      //   $scope.odabrani = $scope.model;
      // })
    }
  }

})();
