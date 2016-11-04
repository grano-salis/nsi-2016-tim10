(function() {
  'use strict';

  angular
    .module('ea.cv')
    .directive('personNameType', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      // restrict: 'E',
      templateUrl: 'app/components/cv/definitions/personNameType/personNameType.tmpl.html',
      controller: ctrl,
      scope: {
        'model':'=model',
        'title':'=title'
      }
    };

    return directive;

    /** @ngInject */
    function ctrl($scope, accountService, toastr) {
      // $scope.cefr = "HI";
      $scope.title = [
        {Label:"mr-",Code:"mr"},
        {Label:"ms-",Code:"mr"},
        {Label:"mrs-",Code:"mrs"},
        {Label:"miss-",Code:"miss"},
        {Label:"dr-",Code:"dr"}
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
