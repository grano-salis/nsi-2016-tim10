(function() {
  'use strict';

  angular
    .module('ea.cv')
    .directive('achievementTitle', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      // restrict: 'E',
      templateUrl: 'app/components/cv/skillsPassport/learnerInfo/achievement/achievementTitle/achievementTitle.tmpl.html',
      controller: ctrl,
      scope: {
        'model':'=model'
      }
    };

    return directive;

    /** @ngInject */
    function ctrl($scope) {
      $scope.odabrani = $scope.model;

      $scope.model = $scope.odabrani;

      if($scope.odabrani)
        $scope.model = $scope.odabrani;

      $scope.$watch('odabrani',function(){
        if($scope.odabrani)
          $scope.model = $scope.odabrani;
      });

      $scope.enum =[
        {Label:"honors_awards",Code:"honors_awards"},
        {Label:"publications",Code:"publications"},
        {Label:"presentations",Code:"presentations"},
        {Label:"projects",Code:"projects"},
        {Label:"citations",Code:"citations"},
        {Label:"memberships",Code:"memberships"},
        {Label:"conferences",Code:"conferences"},
        {Label:"seminars",Code:"seminars"},
        {Label:"workshops",Code:"workshops"},
        {Label:"references",Code:"references"},
        {Label:"signature_equivalent",Code:"signature_equivalent"},
        {Label:"courses",Code:"courses"},
        {Label:"certifications",Code:"certifications"}
      ]
    }
  }

})();
