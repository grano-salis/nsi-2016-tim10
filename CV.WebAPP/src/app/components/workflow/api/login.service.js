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
    // var url = 'assets/europass/xml.schema/';
    // var xsdCountries = 'EuropassISOCountries_V1.6.0.xsd';
    // var xsdNationalities = 'EuropassNationalities_V1.6.0.xsd';
    // var xsdLanguages = 'EuropassISOLanguages_V1.8.0.xsd';
    // var xsdNACEBusinessSector = 'NACE_COM_V1.0.0.xsd';
    // var xsdOccupations = 'EuropassISCO_88_COM_V1.4.0.xsd';
    //
    // var getData = function(lang,xsd){
    //   var deferred = $q.defer();
    //   var get = $http({
    //     method: 'GET',
    //     url: url+xsd,
    //     transformResponse: function (data) {
    //       return angular.element(data);//.parseXML();
    //     }
    //   })
    //     .then(function(data){
    //       debugger;
    //       var niz=[];
    //       var drzave = data.data.find('xsd:enumeration');
    //       for(var i=0;i<drzave.length;i++){
    //         var elem = drzave[i];
    //         var label='';
    //         var kod = elem.attributes['value'].value;
    //         var elem2 = elem.children[0].children;
    //         for(var j=0;j<elem2.length;j++){
    //           var trenutni = elem2[j];
    //           if(trenutni.attributes['xml:lang'].value==lang){
    //             label=trenutni.innerHTML
    //             break;
    //           }
    //         }
    //         niz.push({Code:kod,Label:label});
    //         deferred.resolve(niz);
    //       }
    //     })
    //     .catch(function(data,status){
    //       debugger;
    //     })
    //     .finally(function () {
    //
    //     })
    //
    //   return deferred.promise;
    // };
    //
    // this.getOccupationsLangHR = function () {
    //   return getData('hr',xsdOccupations);
    // }
    //
    // this.getCountriesLangHR = function () {
    //   return getData('hr',xsdCountries);
    // }
    //
    // this.getNationalitiesLangHR = function () {
    //   return getData('hr',xsdNationalities);
    // }
    //
    // this.getLanguagesLangHR = function () {
    //   return getData('hr',xsdLanguages);
    // }
    //
    // this.getNACEBusinessSectorLangHR = function () {
    //   return getData('hr',xsdNACEBusinessSector);
    // }
  }
})();
