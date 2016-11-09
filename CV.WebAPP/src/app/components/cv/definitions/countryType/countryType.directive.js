(function() {
  'use strict';

  angular
    .module('ea.cv')
    .directive('countryType', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      // restrict: 'E',
      templateUrl: 'app/components/cv/definitions/countryType/countryType.tmpl.html',
      controller: ctrl,
      scope: {
        'model':'=model',
        'title':'=title'
      }
    };

    return directive;

    /** @ngInject */
    function ctrl($scope, $http) {

      var test = $http({
        method: 'GET',
        url:'assets/europass/xml.schema/EuropassISOCountries_V1.6.0.xsd',
        transformResponse: function (data) {
          return angular.element(data);//.parseXML();
        }
      })
        //.get('assets/europass/xml.schema/EuropassISOCountries_V1.6.0.xsd')
        .then(function(data){
          debugger;
          $scope.drzave=[];
          var drzave = data.data.find('xsd:enumeration');
          for(var i=0;i<drzave.length;i++){
            var elem = drzave[i];
            var label='';
            var kod = elem.attributes['value'].value;
            var elem2 = elem.children[0].children;
            for(var j=0;j<elem2.length;j++){
              var trenutni = elem2[j];
              if(trenutni.attributes['xml:lang'].value=='hr'){
                label='1';
                label=trenutni.innerHTML
                break;
              }
            }
            $scope.drzave.push({Code:kod,Label:label});
          }
        })
        .catch(function(data,status){
          debugger;
        })
        .finally(function () {

        })



      if($scope.odabrani)
        $scope.model = $scope.odabrani;

      $scope.$watch('odabrani',function(){
        if($scope.odabrani)
          $scope.model = $scope.odabrani;
      });
    }
  }

})();
