# Overview

`wes`, the Web Entertainment System, is a 
retro-style gaming platform for JavaScript.
It aims to simulate (but not emulate) the 
features and constraints of classic gaming 
consoles.

This document describes the architectural 
structure of `wes`.

# Architecture

`wes` itself has three main components:

```nomnoml
#direction: right
[wes|
  [Engines] 
  [Devices] 
  [APIs]
  
  [Engines]->[Devices]
  [Devices]<-[APIs]
]
```

* **Devices** are a stateful abstraction of
  the hardware devices one might expect to 
  find on a gaming console. For instance, 
  video memory might be represented as an array 
  of numbers.
* **Engines** are responsible for mediating 
  between device state and the underlying 
  system context (the browser itself.)
* **APIs** are finally exposed by `wes` to 
  provide a useful abstraction upon the 
  system.

External interactions happen with two 
components:

```nomnoml
[Browser APIs]
[Engines]
[Devices]
[APIs]
[Cartridges]

[Browser APIs]->[Engines]
[Engines]->[Devices]
[APIs]->[Devices]
[Cartridges]->[APIs]
```

* **Browser APIs** are the interface to 
  capabilities provided by the web browser
  running `wes`.
* **Cartridges** are games or applications
  built to run on `wes`. They utilize the 
  APIs exposed by `wes` to interact with 
  system state.

## Devices

```nomnoml
[Devices |
  [Processor |
    [Tasks]
  ]
  [Memory |
    [State]
  ]
  [Storage |
    [State]
  ]
  [Video |
    [Screen]
    [Palette]
  ]
  [Audio |
    [Channels]
  ]
  [Input |
    [Controllers]
  ]
  [Clock |
    [Now]
  ]
]
```

Devices abstracted for `wes` include:

* The **Processor** is used to manage 
  computation. Because device abstractions 
  are stateful, this is represented as a 
  task queue.
* **Memory** is used to store information 
  for a given session of usage.
* **Storage** is used to store information
  persistently.
* **Video** is used to store and manage the 
  displayable state of the system.
* The **Audio** device is used to play music 
  and sound.
* **Input** tracks the state of controllers 
  (e.g. which buttons are and are not 
  pressed.)
* The **Clock** is used to track and handle
  timing information.

## Engines

Engines are used by `wes` to mediate between 
the abstracted device state and the underlying 
browser platform.

```nomnoml
[Engines |
  [Scheduler]
  [Persister]
  [Renderer]
  [Synthesizer]
  [Reader]
  [Timer]
]
```

* The **Scheduler** is responsible for running 
  tasks from the _Processor_'s queue.
* The **Persister** persists data from storage.
* The **Renderer** displays video data.
* The **Synthesizer** renders audio data.
* The **Reader** accepts user input and presents 
  it as controller state.
* The **Timer** manages clock state.

Each engine generally manages one device, 
although this is not intended as an architectural 
constraint.

```nomnoml
[Scheduler]->[Processor]
[Persister]->[Storage]
[Renderer]->[Video]
[Synthesizer]->[Audio]
[Reader]->[Input]
[Timer]->[Clock]

[Browser APIs]<-[Scheduler]
[Browser APIs]<-[Persister]
[Browser APIs]<-[Renderer]
[Browser APIs]<-[Synthesizer]
[Browser APIs]<-[Reader]
[Browser APIs]<-[Timer]
```

## APIs

The APIs provided for use by Cartridges 
include:

```nomnoml
[APIs |
  [Scheduling]
  [Persistence]
  [Display]
  [Graphics]
  [Music]
  [Sound]
  [Control]
  [Timing]
]
```

* The **Scheduling** API provides the ability
  to schedule tasks.
* The **Persistence** API provides state to 
  be stored persistently.
* The **Display** API provides the ability to 
  configure the video device.
* The **Graphics** API provides the ability to 
  draw things.
* The **Music** API provides the ability to 
  play music.
* The **Sound** API provides the ability to play 
  discrete sounds.
* The **Control** API provides an interface upon 
  controller state.
* The **Timing** API provides access to timing 
  information.

These map to various devices:

```nomnoml
[Scheduling]->[Processor]
[Persistence]->[Storage]
[Display]->[Video]
[Graphics]->[Video]
[Music]->[Audio]
[Sound]->[Audio]
[Control]->[Input]
[Timing]->[Clock]

[Cartridges]->[Scheduling]
[Cartridges]->[Persistence]
[Cartridges]->[Display]
[Cartridges]->[Graphics]
[Cartridges]->[Music]
[Cartridges]->[Sound]
[Cartridges]->[Control]
[Cartridges]->[Timing]
```
