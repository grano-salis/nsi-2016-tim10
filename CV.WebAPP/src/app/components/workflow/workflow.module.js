(function() {
  'use strict';

  angular
    .module('ea.workflow', [
      'ngAnimate',
      'ngCookies',
      'ngTouch',
      'ngSanitize',
      'ui.bootstrap',
      'toastr',
      'Slidebox',
      'smoothScroll',


      'ea.api',
      'ea.account',
      'ea.cv'//,


    ]);

})();

(function(){
  "use strict";

  angular
    .module('ea.workflow')
    .service('authService', authService);

  /** @ngInject */
  function authService($http,$q,$window){
    var currentUser = null;
    var sso = "http://do.mac.ba:8888/BusinessLogic/Account.svc/json/auth";
    var ssoL = "http://localhost:48202/";
    var loginURL = "http://localhost:3000/"

    var logoutURL = "BusinessLogic/Account.svc/json/logout ";
    var sessionURL = "BusinessLogic/Account.svc/json/auth";
    var passwordURL = "BusinessLogic/Account.svc/json/changepassword";
    var registerURL = "BusinessLogic/Account.svc/json/register";

    this.isAdmin = function () {
      var deferred = $q.defer();
      if(currentUser!=null){
        debugger
        if(currentUser.Roles.indexOf('ADMIN')>-1)
          deferred.resolve();
        else
          deferred.reject();
        //deferred.resolve(currentUser);
      }else{
        session().then(function (user) {
          debugger
          if(user.Roles.indexOf('ADMIN')>-1)
            deferred.resolve();
          else
            deferred.reject();
          //deferred.resolve(user);
        })
      }
      return deferred.promise;
    }

    this.getCurrentUser = function () {
      var deferred = $q.defer();

      if(currentUser!=null){
        deferred.resolve(currentUser);
      }else{
        session().then(function (user) {
          deferred.resolve(user);
        })
      }

      return deferred.promise;
    }
    var login = function () {
      $window.location.href=loginURL;
    }
    this.login = function () {
      login();
    }
    this.logout = function () {
      $http.post(ssoL+logoutURL,null,{withCredentials: true})
        .then(function (data) {
          debugger
          currentUser = null;
          session();
        },function (error) {
          debugger
        })
    }
    var session = function () {
      var deferred = $q.defer();

      $http.get(ssoL+sessionURL,{withCredentials: true})//
        .then(function (data) {
          debugger
          deferred.resolve(data.data);
        },function (error) {
          debugger
          login();
        })

      return deferred.promise;
    }
    this.resetPassword = function (id,oldPass,newPass) {
      $http.post(ssoL+passwordURL,{
        ID:id,
        OldPassword:oldPass,
        NewPassword:newPass
      },{withCredentials: true})
        .then(function (data) {

        },function (error) {

        })

    }
    this.register = function (username,email,pass,firstname,lastname) {
      var obj = {
          "Username": "uname12",
          "Email": "mail@etef.unsa.ba",
          "Password": "Sifra123",
          "FirstName": "Ime",
          "LastName": "Prezime"
        };
      $http.post(ssoL+registerURL,obj)
        .then(function (data) {
          debugger
        },function (error) {
          debugger
        })
    }
  }
})();

// (function(){
//   "use strict";
//
//   angular
//     .module('ea.api')
//     .service('jsonDiff', fun);
//
//   /** @ngInject */
//   function fun($window){
//     var _init = false;
//     this.jsonDiff = null;
//     var init = function(){
//       var jsondiffpatch = $window.jsondiffpatch;
//       jsonDiff = jsondiffpatch.create({
//         objectHash:function(obj){
//           if(typeof obj._id !=='undefined'){
//             return obj._id;
//           }
//           if(typeof obj.id !== 'undefined'){
//             return obj._id;
//           }
//           if(typeof obj.name !== 'undefined'){
//             return obj.name;
//           }
//           return JSON.stringify(obj);
//         },
//         arrays:{
//           detectMove:true,
//           includeValueOnMove:false
//         },
//         textDiff:{
//           minLength:60
//         }
//       });
//     }
//     init();
//
//     //return jsonDiff;
//   }
// })();
