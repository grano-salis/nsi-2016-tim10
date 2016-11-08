(function() {
  'use strict';

  angular
    .module('ea.cv')
    .directive('cefrLevelType', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      // restrict: 'E',
      templateUrl: 'app/components/cv/definitions/cefrLevelType/cefrLevelType.tmpl.html',
      controller: ctrl,
      scope: {
        'model':'=model'
      }
    };

    return directive;

    /** @ngInject */
    function ctrl($scope, accountService, toastr) {
      // $scope.cefr = "HI";
      $scope.enum = ["A1","A2","B1","B2","C1","C2"];
    }
  }

})();
