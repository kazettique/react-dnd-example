# React-DnD Simple Example

## Basic Concepts

#### Backends:

- HTML5: Support HTML5 DnD events
- Touch: Support touch events on touch devices
- Test: Support testing DnD interactions

#### Item Types:

- The Source of identity in your DnD interactions
- They specify what can be dropped on what
- They carry information about the dragged item that will be used to finish the drop interaction

#### Monitors:

- Communicate to your components what's happening on the DOM side from DnD events
- Passed into React as `context`

---

#### Collector Functions:

- Functions to turn DnD events, coming from monitor, into react `props`. **Collecting** `props`

#### Drag Sources:

- Your draggable components
- Carry information to be passed onto drop targets

## Drop Target:

- Accept certain types of draggable sources