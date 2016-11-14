(function() {
  'use strict';

  angular
    .module('ea.cv')
    .directive('websiteType', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      // restrict: 'E',
      templateUrl: 'app/components/cv/definitions/websiteType/websiteType.tmpl.html',

      controller: ctrl,
      scope: {
        'model':'=model',
        'title':'=title'
      }
    };

    return directive;

    /** @ngInject */
    function ctrl($scope, accountService, toastr) {
      $scope.odabrani = {};

      $scope.niz = [
        {Label:"personal-",Code:"personal"},
        {Label:"business-",Code:"business"},
        {Label:"blog-",Code:"blog"},
        {Label:"portfolio-",Code:"portfolio"}
      ];

      if($scope.odabrani)
        $scope.model = $scope.odabrani;

      $scope.$watch('odabrani',function(){
        if($scope.odabrani)
          $scope.model = $scope.odabrani;
      });
    }
  }

})();
