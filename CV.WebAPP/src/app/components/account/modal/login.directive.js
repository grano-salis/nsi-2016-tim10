(function() {
  'use strict';

  angular
    .module('ea.account')
    .directive('modalLoginPanel', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/account/modal/login.tmpl.html',
      controller: ctrl,
      scope: true
    };

    return directive;

    /** @ngInject */
    function ctrl($scope, accountService, $timeout, $state, toastr) {
      $scope.loginModel = {
        username: "",
        password: ""
      }

      $scope.errors = [];
      $scope.showLoginSpin = false;

      $scope.login = function(){

        angular.copy([], $scope.errors);

        if($scope.lForm.$invalid){

          toastr.error('Check form fields, some of them are invalid!', 'Invalid form' )
          $scope.lForm.username.$setTouched();
          $scope.lForm.password.$setTouched();
          return;
        }

        $scope.showLoginSpin = true;
        accountService.login($scope.loginModel)
          .then(function(){
            $scope.showLoginSpin = false;

            $scope.succefullLogin();
          })
          .catch(function(response){

            $scope.showLoginSpin = false;
            if(response.data.username){
              if(response.data.username == "wrong"){
                $scope.errors.push("Username or password is wrong.");
              }
              if(response.data.username == "required"){
                $scope.errors.push("Username is required.");
              }
            }
            if(response.data.password){
              if(response.data.username == "required"){
                $scope.errors.push("Username is required.");
              }
            }
            if(response.data.email){
              if(response.data.email == "not confirmed"){
                $scope.errors.push("Email isn't confirmed.");
              }
            }
            if(response.data.banned){
              $scope.errors.push("You are banned.");
            }
            if($scope.errors.length > 0)
              toastr.error($scope.errors.join(' '), 'Login failed.');
            else
              toastr.error('Login failed.');

        });

      };
    }
  }

})();
