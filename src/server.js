'use strict';

// // // This is where we build out our server...
// We call merge in all of our calls -> this content will be seen in the terminal

const eventPool = require('./hub');
const soldHandler = require('./apps/vendor');
// const { shippedHandler, deliverPackage } = require('./apps/driver');
// const deliveredHandler = require('./apps/vendor');
const product = require('./chance');

console.log('sold: ', soldHandler);
eventPool.on('PRODUCT_SOLD', soldHandler);
// eventPool.on('READY_FOR_PICKUP', shippedHandler);
// eventPool.on('PACKAGE_SHIPPED', deliverPackage);
// eventPool.on('PACKAGE_DELIVERED', deliveredHandler);

setInterval(() => {
  eventPool.emit('PRODUCT_SOLD', { product });
}, 3000);