/*global define,window*/
define(
  ['./Wes', './Engines', './Devices', './APIs'],
  function (Wes, Engines, Devices, APIs) {
    'use strict';
    
    var devices, engines, apis;
    
    devices = new Devices();
    engines = new Engines(window, devices);
    apis = new APIs(engines);

    return new Wes(engines, devices, apis);
  }
);