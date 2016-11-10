(function() {
  'use strict';

  angular
    .module('ea.cv')
    .directive('contactInfo', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      // restrict: 'E',
      templateUrl: 'app/components/cv/skillsPassport/learnerInfo/identification/contactInfo/contactInfo.tmpl.html',
      controller: ctrl,
      scope: {
        'model':'=model',
        'title':'=title'
      }
    };

    return directive;

    /** @ngInject */
    function ctrl($scope, $http) {


      if($scope.odabrani)
        $scope.model = $scope.odabrani;

      $scope.$watch('odabrani',function(){
        if($scope.odabrani)
          $scope.model = $scope.odabrani;
      });
    }
  }

})();
