(function() {
  'use strict';

  angular
    .module('ea.account')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $httpProvider) {
    $stateProvider
      .state('modal',{
        url:'/',
        abstract:true
      })
      .state('modal.login', {
        url: '/login',
        templateUrl: 'app/components/account/modal/login.tmpl.html',
        controller: function(){ },
        params:{
          openModal: true
        }
      });

      $httpProvider.interceptors.push('authInterceptor');
      $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';

  }

})();
