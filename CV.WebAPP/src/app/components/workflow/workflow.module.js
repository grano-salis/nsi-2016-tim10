(function() {
  'use strict';

  angular
    .module('ea.workflow', [
      'ngAnimate',
      'ngCookies',
      'ngTouch',
      'ngSanitize',
      'ui.router',
      'ui.bootstrap',
      'toastr',
      'Slidebox',
      'smoothScroll',


      'ea.api',
      'ea.account',
      'ea.cv'//,


    ]);

})();

// (function(){
//   "use strict";
//
//   angular
//     .module('ea.api')
//     .service('jsonDiff', fun);
//
//   /** @ngInject */
//   function fun($window){
//     var _init = false;
//     this.jsonDiff = null;
//     var init = function(){
//       var jsondiffpatch = $window.jsondiffpatch;
//       jsonDiff = jsondiffpatch.create({
//         objectHash:function(obj){
//           if(typeof obj._id !=='undefined'){
//             return obj._id;
//           }
//           if(typeof obj.id !== 'undefined'){
//             return obj._id;
//           }
//           if(typeof obj.name !== 'undefined'){
//             return obj.name;
//           }
//           return JSON.stringify(obj);
//         },
//         arrays:{
//           detectMove:true,
//           includeValueOnMove:false
//         },
//         textDiff:{
//           minLength:60
//         }
//       });
//     }
//     init();
//
//     //return jsonDiff;
//   }
// })();
