(function() {
  'use strict';

  angular
    .module('ea')
    .config(config);

  /** @ngInject */
  function config($logProvider,
                  toastrConfig,
                  $anchorScrollProvider,
                  $locationProvider,
                  usSpinnerConfigProvider,
                  $httpProvider,
                  localStorageServiceProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    $locationProvider.html5Mode(true);
    $anchorScrollProvider.disableAutoScrolling();

    // $httpProvider.interceptors.push('allHttpInterceptor');

    //http://spin.js.org/
    usSpinnerConfigProvider.setDefaults({
      color: ['blue','red','yellow'],
      shadow:true,
      corners:0.2,
      lines:17,
      length:10,
      width:52,
      radius:25,
      scale:1,
      opacity:0.1,
      trail:66,

      position: 'absolute',
      zIndex: 2e9,
      top:'50%',
      left:'50%'
    });


    //localstorage
    localStorageServiceProvider
      .setPrefix('NSI');

  }

})();
