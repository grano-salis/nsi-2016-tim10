(function() {
  'use strict';

  angular
    .module('ea')
    .directive('fixedNavbar', directive)
    .directive('fixedNavbarHomepage', directiveHomepage);

  /** @ngInject */
  function NavbarController($scope, $state) {
    $scope.goHome = function(){
        $state.go('home', {scrollTo: 'navbar'});
    }

  }

  /** @ngInject */
  function directive() {
    var directive = {
      replace: true,
      restrict: 'E',
      templateUrl: 'app/components/navbar/fixed-navbar.html',
      scope: {
      },
      controller: NavbarController
    };

    return directive;

    /** @ngInject */

  }

    /** @ngInject */
    function directiveHomepage() {
      var directive = {
        replace: true,
        restrict: 'E',
        templateUrl: 'app/components/navbar/fixed-navbar-homepage.html',
        scope: {
        },
        controller: NavbarController
      };

      return directive;

      /** @ngInject */

    }

})();
