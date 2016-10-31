(function() {
  'use strict';

  angular
    .module('ea.account')
    .controller('AccountModalCtrl', ctrl);

  /** @ngInject */
  function ctrl($scope, $uibModalInstance, toastr) {
    $scope.panel = 0;
    console.log("account.modal");
    $scope.setPanel = function(panelId){
      $scope.panel = panelId;
    }


    $scope.showLogin = function(){
      $scope.setPanel(0);
    }
    $scope.showRegister = function(){
      $scope.setPanel(1);
    }

    $scope.succefullLogin = function(){
      toastr.success('Successfuly logged in!')
      $uibModalInstance.close();
    };

    $scope.succefullRegistration = function(){
      toastr.success('Confirmation mail was sent to you.', 'Succesful registration');
      $scope.showLogin();
    };

    $scope.closeModal = function(){
      $uibModalInstance.dismiss();
    }
  }

})();
