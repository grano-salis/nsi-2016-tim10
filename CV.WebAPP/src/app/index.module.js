(function() {
  'use strict';

  angular
    .module('ea', [
      'ngAnimate',
      'ngCookies',
      'ngTouch',
      'ngSanitize',
      'ui.router',
      'ui.bootstrap',
      'toastr',
      'Slidebox',
      'smoothScroll',
      'duScroll',
      'angularSpinner',
      'bsLoadingOverlay',
      'LocalStorageModule',
      // 'bsLoadingOverlaySpinJs',
      // 'bsLoadingOverlayHttpInterceptor',

      'ea.api',
      'ea.workflow',
      'ea.account',
      'ea.cv'//,


    ]);

})();
