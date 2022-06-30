'use strict';

// requirements
const socketio = require('socket.io');

// opening server to connect:
const io = socketio(3000);

// namespace of caps:
const caps = io.of('/caps');

// order queue:
const orderQueue = {
  pickup: {},
  intransit: {},
  delivered: {},
};

io.on('connection', (socket) => {
  console.log('new conneciton created:' + socket.id);
})

// connection to rooms capacity
caps.on('connection', (capsSocket) => {
  console.log('new cap connection', capsSocket.id);
  
  // pickup socket
  capsSocket.on('pickup', (payload) => {
    console.log('EVENT:', payload);
    // pickup notification
    orderQueue.pickup[payload.messageId] = payload;
    capsSocket.emit('pickup',payload);
  });

  // in-transit socket 
  capsSocket.on('in-transit', (payload) => {
    console.log('EVENT:', payload);
    
    // deletion of pickup history capacity
    delete orderQueue.pickup[payload.messageId];
    // transitioning to in-active-transit notification
    orderQueue.intransit[payload.messageId] = payload;
    capsSocket.emit('in-transit', payload);
  });
  
  // delivery notification socket
  capsSocket.on('delivered', (payload) => {
    console.log('EVENT:', payload);
    // deletion of in-transit history
    delete orderQueue.intransit[payload.messageId];
    // transitioning to delivery notification
    orderQueue.delivered[payload.messageId] = payload;
    capsSocket.emit('delivered', payload);
    caps.emit('delivered', {messageId: payload.messageId, payload: payload});
  });

  // these are held notifications w/in HUB that are accessable to our vendors permitting an 
    // order history.
  capsSocket.on('getAll', () => {
    for (let key in orderQueue.pickup) {
      capsSocket.emit('pickup', orderQueue.pickup[key]);
    } 
    for (let key in orderQueue.intransit) {
      capsSocket.emit('intransit', orderQueue.intransit[key]);
    }
    for (let key in orderQueue.delivered) {
      capsSocket.emit('delivered', orderQueue.delivered[key]);
    }
  });

  // delivering final message that delivery was completed.
  capsSocket.on('recieved', payload => {
    console.log('message recieved');

    capsSocket.emit('recieved', payload);
  });
});
  
  
  
  
  
  
  
  
  
  
  
//   // Joining the room
//   socket.on('join', room => {
//     console.log('room name:', room);
//     socket.join(room);
//   });
//   // picking up the pkg
//   socket.on('PICKUP', payload => {
//     logger('PICKUP', payload);
//     caps.emit('PICKUP', payload)
//   });
//   // driver is now in transit
//   socket.on('IN-TRANSIT', payload => {
//     logger('IN-TRANSIT', payload);
//     caps.emit('IN-TRANSIT', payload);
//   });
//   // driver is delilivering the pkg
//   socket.on('DELIVERED', payload => {
//     logger('DELIVERED', payload);
//     caps.to(payload.store).emit('DELIVERED', payload);
//     caps.emit('DELIVERED', payload);
//   });
// });

// function logger(event, payload){
//     let time = new Date();
//     console.log('EVENT:', {event, time, payload})
// }
// // caps.on('message', message => {
// //     console.log('message:', message.payload.payload);
// //     caps.emit('RECIEVED', message.payload.payload);
// // })