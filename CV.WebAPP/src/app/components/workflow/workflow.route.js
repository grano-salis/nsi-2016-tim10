(function() {
  'use strict';

  angular
    .module('ea.workflow')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('user', {
        url: '/user',
        params: {
          scrollTo: null
        },
        templateUrl: 'app/components/workflow/user/user.tmpl.html',
        controller: 'UserCtrl',
        onEnter: scrollTo
      });

    $urlRouterProvider.otherwise('/');
  }

  /** @ngInject **/
  var scrollTo = function ($location, $stateParams, $timeout) {
    console.log("index.route2");
    if($stateParams.scrollTo != null) {
      $timeout(function() {
        $location.hash($stateParams.scrollTo);
      }, 100);
    }
  };

})();
