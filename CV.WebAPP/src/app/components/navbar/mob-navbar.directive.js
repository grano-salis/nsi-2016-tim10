(function() {
  'use strict';

  angular
    .module('ea')
    .directive('mobNavbar', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      restrict: 'E',
      transclude: true,
      templateUrl: 'app/components/navbar/mob-navbar.html',
      // scope: {
      //
      // },
      controller: NavbarController
    };

    return directive;

    /** @ngInject */
    function NavbarController($scope, accountModal, $state) {

      $scope.dummy = function () {
        alert('hi ovomeni neki dropdown');
      }

        $scope.showMenu = false;
        $scope.showAccountModal = function(){
          accountModal(true);
        };
        $scope.goHome = function(){
            $state.go('home', {scrollTo: 'navbar'});
        };
        $scope.go = function(state){
          $state.go(state,{scrollTo:'navbar'});
        }
    }
  }

})();
