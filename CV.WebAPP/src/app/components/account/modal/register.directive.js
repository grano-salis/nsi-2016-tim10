(function() {
  'use strict';

  angular
    .module('ea.account')
    .directive('modalRegisterPanel', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/account/modal/register.tmpl.html',
      controller: ctrl,
      scope: true
    };

    return directive;

    /** @ngInject */
    function ctrl($scope, accountService, toastr) {
      $scope.newUser = {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      }

      $scope.showSpin = false;
      $scope.errors = [];
      $scope.register = function(){

        angular.copy([], $scope.errors);

        if($scope.rForm.$invalid){

          toastr.error('Check form fields, some of them are invalid!', 'Invalid form' )
          $scope.rForm.username.$setTouched();
          $scope.rForm.email.$setTouched();
          $scope.rForm.password.$setTouched();
          $scope.rForm.confirmPassword.$setTouched();

          return;
        }

        $scope.showSpin = true;
        accountService.register($scope.newUser)
          .then(function(){
            // tek poslije ovog je mijenjano. ova success poruka, i hendlanje errora
            $scope.showSpin = false;
            $scope.succefullRegistration();

          })
          .catch(function(response){

            $scope.showSpin = false;
            if(response.data.username){
              switch (response.data.username) {
                case "exists":
                  $scope.errors.push('Username already exists.');
                  break;
                case "minlength":
                  $scope.errors.push('Username is too short.');
                  break;
              }

            }
            if(response.data.email){
              switch (response.data.email) {
                case "exists":
                  $scope.errors.push('Email already exists.');
                  break;

                case "not valid":
                  $scope.errors.push("Email isn't valid.");
                  break;
              }
            }

            if(response.data.password){
              switch (response.data.password) {
                case "required":
                  $scope.errors.push("Password is required");
                  break;

                case "weak":
                  $scope.errors.push("Password is weak. Password must be minimum 8 char long, and have at least one lowercase and uppercase letter.");
                  break;
              }
            }

            if(response.data.body){ // ajv validation errors

              angular.forEach(response.data.body, function(value){
                switch (value.dataPath){
                  case ".password":
                    if(value.keyword == "type"){
                      $scope.errors.push("Password must be string.");
                    }
                    if(value.keyword == "checkPassword"){
                      $scope.errors.push("Password is weak. Password must be minimum 8 char long, and have at least one lowercase and uppercase letter.");
                    }
                    break;
                  case ".username":
                    if(value.keyword == "type"){
                      $scope.errors.push("Username must be string.");
                    }
                    if(value.keyword == "minLength"){
                      $scope.errors.push("Username is short. It have to be at least 6 characters long.");
                    }
                    if(value.keyword == "maxLength"){
                      $scope.errors.push("Username is too long. Maximum length is 15.");
                    }
                    break;
                  case ".email":
                    if(value.keyword == "type"){
                      $scope.errors.push("Email must be string.");
                    }
                    if(value.keyword == "format"){
                      $scope.errors.push("Email isn't valid.");
                    }
                    break;
                } // end of switch
              }); // end of .forEach
            }
            toastr.error('Registration error.');

        }); // end of .catch
      }; // end of scope.register
    }
  }

})();
