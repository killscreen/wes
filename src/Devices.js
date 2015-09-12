/*global define*/
define(
  [
    './devices/Processor',
    './devices/Memory',
    './devices/Storage',
    './devices/Video',
    './devices/Audio',
    './devices/Input',
    './devices/Clock'
  ],
  function (Processor, Memory, Storage, Video, Audio, Input, Clock) {
    'use strict';
    
    function Devices() {
      this.processor = new Processor();
      this.memory = new Memory();
      this.storage = new Storage();
      this.video = new Video();
      this.audio = new Audio();
      this.input = new Input();
      this.clock = new Clock();
    }
    
    return Devices;
  }
);