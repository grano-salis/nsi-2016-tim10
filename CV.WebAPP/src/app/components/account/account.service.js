(function(){
"use strict";

angular
  .module('ea.account')
  .service('accountService', accountService);

/** @ngInject */
function accountService($http, localStorageService, serverName, $q){

  var currentUser = { user: null, token: null };

      this.confirmEmail = function(token){
        return $http({
            url: serverName + '/api/user/confirm-email',
            method: "POST",
            data: { token: token }
        });
      };

      this.requestreset = function(email){
        return $http({
          url: serverName + '/api/user/request-reset-pass',
          method: "POST",
          data: { email: email }
        });
      };

      this.resetPass = function(resetModel){
        return $http({
          url: serverName + '/api/user/reset-pass',
          method: "POST",
          data: {
            token: resetModel.token,
            password: resetModel.password
          }
        })
      }
      this.login = function (loginModel) {

          var deferred = $q.defer();

          $http({
              url: serverName + '/api/user/login',
              method: "POST",
              data: loginModel
          }).then(function (lResponse) {

            var data = { token: lResponse.data.token };
            localStorageService.set('authorizationData', data);

            $http({
                url: serverName + '/api/user',
                method: "GET"
            }).then(function(uResponse){
              var data = { token: lResponse.data.token, user: uResponse.data};
              localStorageService.set('authorizationData', data);
              setCurrentUser(data);
              deferred.resolve(currentUser);

            }, function(response){
              localStorageService.set('authorizationData', { token: null, user: null });
              currentUser.IsLoggedIn = false;
              deferred.reject(response);
            });

          },
          function (response) {
              localStorageService.set('authorizationData', { token: null, user: null });
              currentUser.IsLoggedIn = false;
              deferred.reject(response);
          });

          return deferred.promise;
      };

      this.logout = function () {
          localStorageService.set('authorizationData', { token: null, user: null });
          currentUser.user = null;

      };

      this.register = function (registerModel) {
          var deferred = $q.defer();

          $http({
              url: serverName + '/api/user/register',
              method: "POST",
              data: registerModel
          }).then(function (response) {
               deferred.resolve(response);
          },
          function (response) {
              localStorageService.set('authorizationData', { token: null, user: null });
              deferred.reject(response);
          });

          return deferred.promise;
      };
      this.getCurrentUser = function () {
          var data = localStorageService.get('authorizationData');

          if (data)
          {
              setCurrentUser(data);
          } else{
              setCurrentUser({token:null, user:null});
          }
          return currentUser;
      };
      this.isLoggedIn = function(){
          var c_user = this.getCurrentUser();

          return !!c_user && !!c_user.token;
      };
      this.isSuperAdmin = function(){
        var user = this.getCurrentUser().user;

        return !(!user || !user.superadmin);
      }
      var setCurrentUser = function (loginModel) {
          currentUser.token = loginModel.token;
          currentUser.user = loginModel.user;
      };
  }
})();
