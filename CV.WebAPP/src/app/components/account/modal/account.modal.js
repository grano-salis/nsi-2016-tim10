(function() {
  'use strict';

    angular
      .module('ea.account')
      .service('accountModal', service);

  /** @ngInject */
  function service($uibModal){

    return function(animation, appendTo){
      var modalInstace = $uibModal.open({
        animation: animation || false,
        templateUrl: 'app/components/account/modal/account-modal.tmpl.html',
        controller: 'AccountModalCtrl',
        size: 'lg',
        windowClass:'account-modal',
        backdropClass: 'account-modal-backdrop',
        appendTo: appendTo
      });

      return modalInstace;
    }

  }

})();
