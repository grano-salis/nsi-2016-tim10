(function() {
  'use strict';

  angular
    .module('ea')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('login', {
        url: '/login',
        params: {
          scrollTo: null
        },
        templateUrl: 'app/components/Login/login.html',
        controller: 'HomeCtrl',
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
