'use strict';

require('dotenv').config();
const io = require('socket.io-client');

const HOST = process.env.HOST || 'http://localhost:3000';

let capsConnection = io.connect(`${HOST}/caps`);

capsConnection.on('PICKUP', handleDelivery);

function handleDelivery(payload){
    setTimeout(() => {
        console.log(`picking up ${payload.orderID}`);
        //payload.event = 'IN-TRANSIT';
        //payload.time = new Date();
        capsConnection.emit('IN-TRANSIT', payload);
    }, 1500);
    setTimeout(() => {
        console.log(`delivered ${payload.orderID}`);
        //payload.event = 'DELIVERED';
        //payload.time = new Date();
        capsConnection.emit('DELIVERED', payload);
    }, 3000);

}

// capsConnection.on('IN-TRANSIT', payload => {
// });