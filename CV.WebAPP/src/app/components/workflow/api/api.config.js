(function() {
  'use strict';

  angular
    .module('ea.api')
    .config(config);

  /** @ngInject */
  function config($logProvider,
                  localStorageServiceProvider) {
    // Enable log
    $logProvider.debugEnabled(true);


    //localstorage
    localStorageServiceProvider
      .setPrefix('NSI-api');

  }

})();
