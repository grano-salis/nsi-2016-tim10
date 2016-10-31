(function() {
  'use strict';

  angular
    .module('ea')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $anchorScroll) {
    $log.debug('runBlock end');
    //$anchorScroll = angular.noop;
  }

})();
