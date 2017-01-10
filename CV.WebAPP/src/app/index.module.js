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
      //'ui.checkbox',
      'toastr',
      'Slidebox',
      'smoothScroll',
      'duScroll',
      'angularSpinner',
      'bsLoadingOverlay',
      'LocalStorageModule',
      'ngPrettyJson',
      // 'bsLoadingOverlaySpinJs',
      // 'bsLoadingOverlayHttpInterceptor',

      'checklist-model',

      'ea.api',
      'ea.workflow',
      'ea.account',
      'ea.cv'//,


    ]);

})();
