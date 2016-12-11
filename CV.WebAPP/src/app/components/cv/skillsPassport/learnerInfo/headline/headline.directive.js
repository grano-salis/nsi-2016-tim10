(function() {
  'use strict';

  angular
    .module('ea.cv')
    .directive('headline', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      // restrict: 'E',
      templateUrl: 'app/components/cv/skillsPassport/learnerInfo/headline/headline.tmpl.html',
      controller: ctrl,
      scope: {
        'model':'=model'
      }
    };

    return directive;

    /** @ngInject */
    function ctrl($scope, accountService, toastr) {
      $scope.cefr = "HI";

      $scope.type = {};
      // $scope.type.Code =[
      //   "preferred_job",
      //   "job_applied_for",
      //   "studies_applied_for",
      //   "position",
      //   "personal_statement"
      // ];
      // $scope.type.label =[
      //   "preferred job",
      //   "job applied for",
      //   "studies applied for",
      //   "position",
      //   "personal statement"
      // ];
      $scope.type = [
        {Code:"preferred_job",Label:"preferred job"},
        {Code:"job_applied_for",Label:"job applied for"},
        {Code:"studies_applied_for",Label:"studies applied for"},
        {Code:"position",Label:"position"},
        {Code:"personal_statement",Label:"personal statement"}
      ];

      //$scope.odabrani = {};

      $scope.description = {};
      $scope.description.label = "";

      $scope.model = $scope.odabrani;

      if($scope.odabrani)
        $scope.model = $scope.odabrani;

      $scope.$watch('odabrani',function(){
        if($scope.odabrani)
          $scope.model = $scope.odabrani;
      });
    }
  }

})();
