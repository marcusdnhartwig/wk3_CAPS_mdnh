'use strict';

require('dotenv').config();
//const { product } = require('../chance');
const Chance = require('chance');
const chance = new Chance();


//const chance = new chance();

//const { chance } = require('chance');
//const flowers = 'flowers';
const store = '1-206-WILD-FLOWERS';

const io = require('socket.io-client');

const HOST = process.env.HOST || 'http://localhost:3000';

const capsConnection = io.connect(`${HOST}/caps`);

capsConnection.emit('join', store); // connecting to a room

setInterval(() => {
    let product = {
        store: store,
        orderID: chance.guid(),
        customer: chance.name(),
        address: chance.address(),
    };
    capsConnection.emit('PICKUP', product)
}, 3000);

capsConnection.on('DELIVERED', payload => {
    console.log(`yes this has been delivered ${payload.orderID}`);
});