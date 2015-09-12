/*global define*/
define(
  function () {
    'use strict';
    
    function Wes(engines, devices, apis) {
      function W(e, d, a) {
        Wes.apply(this, [e || engines, d || devices, a || apis]);
      }
      W.prototype = Wes.prototype;
      
      this.engines = engines;
      this.devices = devices;
      this.apis = apis;
    }

    return Wes;
  }
);