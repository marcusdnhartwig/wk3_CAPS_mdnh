'use strict';

const { Chance } = require('chance');

require('dotenv').config;
const IO_PORT = process.env.PORT || 3000;

const io = require('socket.io')(IO_PORT);

const caps = io.of('/caps');

io.on('connection', socket => {
  console.log('client:', socket.id);
});

//const store = 'HARTWIG STORE';
//const store2 = '1-206-Wild-Flowers';

//caps.emit('getAll', store);
//caps.emit('gitAll', store2);

caps.on('connection', socket => {

  socket.on('join', room => {
    console.log('room name:', room);
    socket.join(room);
  });
  socket.on('PICKUP', payload => {
    logger('PICKUP', payload);
    caps.emit('PICKUP', payload)
  });
  socket.on('IN-TRANSIT', payload => {
    logger('IN-TRANSIT', payload);
    caps.emit('IN-TRANSIT', payload);
  });
  socket.on('DELIVERED', payload => {
    logger('DELIVERED', payload);
    caps.to(payload.store).emit('DELIVERED', payload);
    caps.emit('DELIVERED', payload);
  });
});

function logger(event, payload){
    let time = new Date();
    console.log('EVENT:', {event, time, payload})
}
// caps.on('message', message => {
//     console.log('message:', message.payload.payload);
//     caps.emit('RECIEVED', message.payload.payload);
// })