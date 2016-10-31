(function() {
  'use strict';

  angular
    .module('ea')
    .controller('HomeCtrl', ctrl);

  /** @ngInject */
  function ctrl($scope, $timeout, toastr, accountModal, $location, $document,
                $window, homeService, accountService, $state, $stateParams, smoothScroll, $anchorScroll) {

    var navbar;
    $scope.showAccountModal = showAccountModal;
    $scope.sendContactUs = sendContactUs;
    $scope.subscribe = subscribe;
    $scope.isLoggedIn = isLoggedIn;
    $scope.getCurrentUser = getCurrentUser;
    var smoothScrollOptions = { // look https://github.com/d-oliveros/ngSmoothScroll for more
      duration:500,
      easing:'easeInQuad',
      offset:49 // 1 less then navbar debounce
    }

    activate();

    function activate() {
      $scope.showNavbarFixed = false;
      // Dohvatamo 'veliki' navbar. Treba nam pri racunanju treba li prikazati navbar-fixed
      navbar = angular.element($document[0].getElementById('a-navbar'));

      $scope.$watch(function(){
        return $window.scrollY;
      }, calcShowingFixedNabvar);
      var applyCSFN = function(){
        console.log("Scroll");
        $scope.$apply(function(){
          calcShowingFixedNabvar($window.scrollY);
        });
      };
      var $win = angular.element($window);

      $win.on('scroll', applyCSFN);
      $win.on('resize', applyCSFN);
      //$win.unbind('hashchange');
      $win.on('hashchange', onHashChange);
      calcShowingFixedNabvar();

      $scope.$on('$destroy', function(){ // Memory leak sprecavamo, jer inace ostane bindano
        $win.unbind('scroll', applyCSFN);
        $win.unbind('resize', applyCSFN);
        $win.unbind('hashchange', onHashChange);
      });

      checkEmailConfirm();

    }

    function onHashChange(){
        var newHash = $location.hash();
        console.log("New hash: ", newHash);

        if(newHash == "login"){
          accountModal(true).result.finally(function(){
            $location.hash(null);
          });
        } else if(newHash == "totop") { // navbar is on top, scroll to it and remove hash
          var elem = $document[0].getElementById('a-navbar');
          if(!elem){ // if there is no element return
            return;
          }
          smoothScroll(elem, smoothScrollOptions);

          $location.hash(null);
        } else {
          // we add prefix 'a-' on element to workaround autoscrolling problem on hash change
          var elem = $document[0].getElementById('a-' + newHash);
          if(!elem){ // if there is no element return
            return;
          }
          smoothScroll(elem, smoothScrollOptions);
        }
    }

    function showAccountModal() {
      $location.hash('login');

    }

    function scrollTo(divId){
      $location.hash(divId);
    }

    var realYOff; // Cilj ovog je da sprijecimo onHashChanged da se automatski scrolla, tako sto cemo pamtiti gdje je prije bio
    function calcShowingFixedNabvar(newWindowOffset){
      console.log(newWindowOffset);
      realYOff = newWindowOffset;
      var debounce = 50;
      var navbarEnd = navbar.prop('offsetTop') + navbar.prop('offsetHeight');
      return $scope.showNavbarFixed = newWindowOffset >= navbarEnd - debounce;
    }

    $scope.contactUs = {
      name: "",
      email: "",
      body: ""
    }
    $scope.cErrors = [];
    function sendContactUs(){

      angular.copy([], $scope.cErrors);

      if($scope.cForm.$invalid){

        toastr.error('Check form fields, some of them are invalid!', 'Invalid form' )
        $scope.cForm.name.$setTouched();
        $scope.cForm.email.$setTouched();
        $scope.cForm.body.$setTouched();

        return;
      }

      $scope.showCSpin = true;
      homeService.sendContactUs($scope.contactUs)
        .then(function(){
          // tek poslije ovog je mijenjano. ova success poruka, i hendlanje errora
          $scope.showCSpin = false;
          $scope.contactUs.name="";
          $scope.contactUs.email="";
          $scope.contactUs.body="";

          $scope.cForm.$setPristine();
          $scope.cForm.$setValidity();
          $scope.cForm.$setUntouched();
          toastr.success('Your message is sent.')
        })
        .catch(function(response){

          $scope.showSpin = false;

          if(response.data.body){ // ajv validation errors

            angular.forEach(response.data.body, function(value){
              switch (value.dataPath){
                case ".body":
                  if(value.keyword == "type"){
                    $scope.errors.push("Message must be string.");
                  }
                  break;
                case ".name":
                  if(value.keyword == "type"){
                    $scope.errors.push("Name must be string.");
                  }
                  if(value.keyword == "minLength"){
                    $scope.errors.push("Name is short. It have to be at least 4 characters long.");
                  }
                  if(value.keyword == "maxLength"){
                    $scope.errors.push("Name is too long. Maximum length is 50.");
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
            });// end of .forEach
          }
          toastr.error('Cant send message. Check form errors.');
        }); // end of .catch

    }

    $scope.newsletter = {
      email:""
    }
    $scope.nErrors = []
    function subscribe(){

      angular.copy([], $scope.nErrors);

      if($scope.nForm.$invalid){

        toastr.error('Check form fields, some of them are invalid!', 'Invalid form' )
        $scope.nForm.email.$setTouched();

        return;
      }

      $scope.showNSpin = true;
      homeService.subscribeOnNewsletter($scope.newsletter)
        .then(function(){
          // tek poslije ovog je mijenjano. ova success poruka, i hendlanje errora
          $scope.showNSpin = false;
          $scope.newsletter.email="";

          $scope.nForm.$setPristine();
          $scope.nForm.$setValidity();
          $scope.nForm.$setUntouched();
          toastr.success('You are subscribed.')
        })
        .catch(function(response){

          $scope.showSpin = false;

          if(response.data.email == "exists"){
            $scope.nErrors.push("You are already subscribed.")
          }

          if(response.data.body){ // ajv validation errors

            angular.forEach(response.data.body, function(value){
              switch (value.dataPath){
                case ".email":
                  if(value.keyword == "type"){
                    $scope.nErrors.push("Email must be string.");
                  }
                  if(value.keyword == "format"){
                    $scope.nErrors.push("Email isn't valid.");
                  }
                  break;
              } // end of switch
            });// end of .forEach
          }
          toastr.error('Can\'t subscribe. Check errors.');
        }); // end of .catch
    }


    function isLoggedIn(){
      return accountService.isLoggedIn();
    }

    function getCurrentUser(){
      return accountService.getCurrentUser().user;
    }

    function checkEmailConfirm(){
      if($stateParams['email-confirm']){// Provjeravamo da li ima parametra email confirm

        accountService.confirmEmail($stateParams['email-confirm'])
          .then(function(resp){
            console.log(resp);
            toastr.success("Email successfully confirmed.");

            $state.go('home',{scrollTo:'login','email-confirm':null}, {notify:true});
            showAccountModal();
          })
          .catch(function(response){
            if(response.data.token) {
              if(response.data.token == "not valid"){
                toastr.error("Token is already used or not valid.", "Confirmation error");
              }
              if(response.data.token == "expired"){
                toastr.error("Token expired.", "Confirmation error");
              }
            }
            else {
              toastr.error("Confirmation error.");
            }

          });
      }
    }
  }

})();
