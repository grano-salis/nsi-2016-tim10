(function(){
  "use strict";

  angular
    .module('ea.api')
    .service('loginService', loginService);

  /** @ngInject */
  function loginService($http,$q){
    var currentUser=null;

    var setCurrentUser = function(user){
      currentUser = user;
    }

    this.setUserAdminDummy = function(){
      currentUser = {id:'admin',name:'Admin'};
    };
    this.setUserDummy = function(){
      currentUser = {id:'user',name:'User'};
    };

    this.getCurrentUser = function(){
      return currentUser;
    }

  }
})();
