'use strict';

// hub.js manages the event queue and live handling of all inbound events. 
//  Clients (stores and drivers) never talk to each other directly, 
//      they work through the hub, like a switchboard

// Events come together here.

const Event = require('events');
const eventPool = new Event();

module.exports = eventPool;