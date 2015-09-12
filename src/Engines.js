/*global define*/
define(
  [
    './engines/Scheduler',
    './engines/Persister',
    './engines/Renderer',
    './engines/Synthesizer',
    './engines/Reader',
    './engines/Timer'
  ],
  function (Scheduler, Persister, Renderer, Synthesizer, Reader, Timer) {
    'use strict';
    
    function Engines(window, devices) {
      this.scheduler = new Scheduler(window, devices.processor);
      this.persister = new Persister(window, devices.storage);
      this.renderer = new Renderer(window, devices.video);
      this.synthesizer = new Synthesizer(window, devices.audio);
      this.reader = new Reader(window, devices.input);
      this.timer = new Timer(window, devices.clock);
    }
    
    return Engines;
  }
);