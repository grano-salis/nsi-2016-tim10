(function() {
  'use strict';

  angular
    .module('ea.cv')
    .directive('structuredDateType', directive);

  /** @ngInject */
  function directive() {
    var directive = {
      // restrict: 'E',
      templateUrl: 'app/components/cv/definitions/structuredDateType/structuredDateType.tmpl.html',
      require:'ngModel',
      link:lnk,
      controller: ctrl,
      scope: {
        'ngModel':'=ngModel'
      }
    };

    return directive;

    function lnk(scope,elem,attrs,ngModelCtrl) {
      ngModelCtrl.$formatters.push(function (modelVal) {
        // debugger
        var rez = null;
        if(modelVal !=null && typeof (modelVal)!='undefined')
          rez = new Date(modelVal.Year,modelVal.Month-1,modelVal.Day);

        return rez;
      })
      ngModelCtrl.$render = function () {
        // debugger
        scope.model = ngModelCtrl.$viewValue;
      }

      scope.$watch('model',function () {
        ngModelCtrl.$setViewValue(scope.model);
      })

      ngModelCtrl.$parsers.push(function (viewVal) {
        // debugger
        var year = viewVal.getFullYear();
        var month = viewVal.getMonth()+1;
        var day = viewVal.getDate();
        return {
          Year:year,
          Month:month,
          Day:day
        }
      })
    }
    /** @ngInject */
    function ctrl($scope, accountService, toastr) {
      // $scope.odabrani = {};
      // $scope.dt={};
      //
      // // $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = 'dd-MM-yyyy';
      //
      // $scope.open1 = function() {
      //   $scope.popup1.opened = true;
      // };
      //
      // // $scope.today = function() {
      // //   $scope.dt = new Date();
      // // };
      // // $scope.today();
      //
      // $scope.clear = function() {
      //   $scope.dt = null;
      // };
      //
      // $scope.inlineOptions = {
      //   customClass: getDayClass,
      //   minDate: new Date(),
      //   showWeeks: true
      // };
      //
      $scope.dateOptions = {
        // maxDate: new Date(),
        // minDate: new Date(),
        startingDay: 1
      };
      //
      // // Disable weekend selection
      // function disabled(data) {
      //   var date = data.date,
      //     mode = data.mode;
      //   return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
      // }
      //
      // $scope.toggleMin = function() {
      //   $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
      //   $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
      // };
      //
      // $scope.toggleMin();
      //
      $scope.open = function() {
        $scope.popup.opened = true;
      };
      //
      // // $scope.open2 = function() {
      // //   $scope.popup2.opened = true;
      // // };
      //
      // // $scope.setDate = function(year, month, day) {
      // //   $scope.dt = new Date(year, month, day);
      // // };
      //
      // // $scope.formats = [, 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      // $scope.format = 'dd-MMMM-yyyy';
      // $scope.altInputFormats = ['yyyy/MM/dd'];
      //
      $scope.popup = {
        opened: false
      };
      //
      // // $scope.popup2 = {
      // //   opened: false
      // // };
      //
      // var tomorrow = new Date();
      // tomorrow.setDate(tomorrow.getDate() + 1);
      // var afterTomorrow = new Date();
      // afterTomorrow.setDate(tomorrow.getDate() + 1);
      // $scope.events = [
      //   {
      //     date: tomorrow,
      //     status: 'full'
      //   },
      //   {
      //     date: afterTomorrow,
      //     status: 'partially'
      //   }
      // ];
      //
      // function getDayClass(data) {
      //   var date = data.date,
      //     mode = data.mode;
      //   if (mode === 'day') {
      //     var dayToCheck = new Date(date).setHours(0,0,0,0);
      //
      //     for (var i = 0; i < $scope.events.length; i++) {
      //       var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
      //
      //       if (dayToCheck === currentDay) {
      //         return $scope.events[i].status;
      //       }
      //     }
      //   }
      //
      //   return '';
      // }
      //

      $scope.odabrani = $scope.model;

      // $scope.$watch('model',function (neww,old) {
      //   if(neww!=null && typeof (neww)!='undefined')
      //     $scope.dt = new Date(neww.Year,neww.Day,neww.Month);
      //   $scope.odabrani = $scope.model;
      //   // alert('1');
      // })
      //
      // $scope.dt=null;
      // $scope.$watch('dt',function(neww,old){
      //   // alert('dt '+old+' '+neww);
      //   debugger;
      //   if(neww!=null){
      //   // if($scope.dt!=null && typeof ($scope.dt)!='undefined')
      //   // {
      //     $scope.odabrani = {};
      //     $scope.odabrani.Month = $scope.dt.getMonth()+1; //Because function getMonth returns values between 0-11
      //     $scope.odabrani.Day = $scope.dt.getDate()
      //     $scope.odabrani.Year = $scope.dt.getFullYear();
      //   }
      //   // }
      // })
      //
      //
      //
      // if($scope.odabrani)
      //   $scope.model = $scope.odabrani;
      //
      // $scope.$watch('odabrani',function(){
      //   if($scope.odabrani) {
      //     $scope.model = $scope.odabrani;
      //     // alert($scope.odabrani);
      //   }
      // });
    }
  }

})();
