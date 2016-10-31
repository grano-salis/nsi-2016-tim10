/* global moment:false*/
(function() {
  'use strict';

  angular
    .module('ea')
    .constant('moment', moment)
		.constant('serverName', "http://localhost:8080")
    .constant('homepage', "http://localhost:3000/");

})();
