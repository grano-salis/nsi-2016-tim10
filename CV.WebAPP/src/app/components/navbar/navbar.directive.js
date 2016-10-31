(function() {
  'use strict';

  angular
    .module('ea')
    .directive('acmeNavbar', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController
    };

    return directive;

    /** @ngInject */
    function NavbarController($scope, moment) {
      $scope.relativeDate = moment($scope.creationDate).fromNow();
    }
  }

})();
