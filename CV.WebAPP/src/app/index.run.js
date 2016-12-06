(function() {
  'use strict';

  angular
    .module('ea')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $anchorScroll,bsLoadingOverlayService) {
    $log.debug('runBlock end');
    //$anchorScroll = angular.noop;
    bsLoadingOverlayService.setGlobalConfig({
      templateUrl: 'loading-overlay-template.html'
    });
  }

})();
