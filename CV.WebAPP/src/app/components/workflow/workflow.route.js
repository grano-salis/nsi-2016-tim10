(function() {
  'use strict';

  angular
    .module('ea.workflow')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('admin', {
        url: '/admin',
        params: {
          scrollTo: null
        },
        templateUrl: 'app/components/workflow/admin/admin.tmpl.html',
        controller: 'adminCtrl',
        onEnter: scrollTo
      })
      .state('test', {
        url: '/test',
        params: {
          scrollTo: null
        },
        templateUrl: 'app/components/workflow/test.tmpl.html',
        controller: 'testCtrl',
        onEnter: scrollTo
      })
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

(function() {
  'use strict';

  angular
    .module('ea.workflow')
    .value('duScrollDuration', 1000)
    // .value('duScrollOffset', 30)
    .controller('testCtrl', ctrl);

  /** @ngInject */
  function ctrl($scope,$http,$location,$anchorScroll,localStorageService,
                smoothScroll,$document,$timeout,loginService, apiService,
                bsLoadingOverlayService,$window) {

    alert('aloha');


  }

})();
