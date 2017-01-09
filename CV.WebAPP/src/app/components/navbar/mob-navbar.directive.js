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
    function NavbarController($scope, accountModal, $state,authService) {
      authService.getCurrentUser().then(function (data) {
        //alert(data);
        debugger;
        $scope.user = data;
      });
      $scope.user = {};
      $scope.dummy = function () {
        //alert('hi ovomeni neki dropdown');

      }
      $scope.logout = function () {
        authService.logout();
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
