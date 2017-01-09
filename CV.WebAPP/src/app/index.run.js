(function() {
  'use strict';

  angular
    .module('ea')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $anchorScroll,bsLoadingOverlayService, $state, $stateParams,$rootScope,authService) {
    $log.debug('runBlock end');
    //$anchorScroll = angular.noop;
    bsLoadingOverlayService.setGlobalConfig({
      templateUrl: 'loading-overlay-template.html'
    });

    $rootScope.$on('$stateChangeStart',
      function(event, toState, toStateParams)
      {
        // track the state the user wants to go to;
        // authorization service needs this
        debugger;
        $rootScope.toState = toState;
        $rootScope.toStateParams = toStateParams;

        // authService.isAdmin().then(function () {
        //   debugger
        //     event.preventDefault();
        //     $state.go('admin');
        //
        // },function () {
        //   debugger
        //     event.preventDefault();
        //     $state.go('user');
        //
        // })


        // if the principal is resolved, do an
        // authorization check immediately. otherwise,
        // it'll be done when the state it resolved.
        // if (principal.isIdentityResolved())
        //   authorization.authorize();
      });
  }

})();
