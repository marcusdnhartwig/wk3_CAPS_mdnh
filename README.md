# wk3_CAPS_mdnh

## Technical Reqs. 

The application will be created with the following overall architecture and methodologies.

- Node.js
- Socket.io for realtime event management
- ES6 Classes and best practices
- ExpressJS Web Server
    - For simulating pickup requests
    - For simulating delivery scans
- In-Memory messaging queue
- Test Driven Development, using Jest
    - Tests will be runnable locally
    - Tests will auto-execute (CI) in your repo using GitHub actions
    - Tests will use a 3rd party library called supergoose to:
        - "mock” the mongo running database
        - “mock” the running Express server
- Deployment to Heroku

## User Stories

As a *business,* our primary goal is to increase the visibility on the state of packages in the delivery process.

We have 2 major clients for this service: *Vendors* and *Drivers.* Each need to have full and live visibility into the state of a package as it’s being delivered to a customer.

**Vendor**

- As products are sold that need to be delivered, we need to alert the drivers that a package is ready for pickup/delivery.
- As a driver picks up a package, the store owner should know that the package is now “in transit”.
- Once the driver delivers a package, the store owner should know that the package has been delivered.

*Ideally, these notifications should be visible in real time on any device (screen, app, browser, etc).*

**Driver**

- As stores sell product and need a package delivered, Drivers need an instant notification to pick the package up.
- Drivers need a way to scan a package and alert the vendors that the package is in transit.
- Drivers need a way to scan a package and alert the vendors that the package has been delivered.

**Business**

*Essential to this system working is that we have to operate in real time. As things happen with the packages, everyone needs to know at that moment, with a guarantee that every state change is visible even if they are not online.*

- We don’t want our clients having to refresh their browser to get the latest status updates.
- We also are aware that they will not always have their browser open …
    - So, if they leave & come back, it’s imperative that they can the state of things since they last logged in.


![img](/assets/Screen%20Shot%202022-06-27%20at%209.00.07%20PM.png)

![img](/assets/Screen%20Shot%202022-06-28%20at%202.10.30%20PM.png)



*Credit & Collab*

//> Brady Davenport
//> Abdinasir Yussuf
//> Guy Farley
//> Ryan Gallaway
//> Justin Hamerly