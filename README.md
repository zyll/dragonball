dragonball
==========

Sorry but expect to see experimental and rought stuff here.

# Software deps

  Node and cordova.

# Hardware

  An android device.

  3 fix points (distance between each point must be stable), conductive and connected to a
  capacitive object (conductive with as much surface as you can: a long wired, pilled aluminium paper or a human body).

  A quick tester could be a 3 points pierced cardboard, or simply use 3 free fingers.

# Install

 you should install a cli cordova with some configured with at least 3 simultaneaous touch.
 Not test the install from scratch, but since cordova platforms and plugin are not versioned, you must initialize
 cordova in some way.
 then ```npm install && npm deploy```will bundle and install the app on your connected device.

 For now, it is early stage, it only display maximum and minimum distance in the triangle (to evalaute variance).

 # Run

 ## in browser

  ```npm run bundle && npm start``` then browse to your localhost or ip on port 3000.
  you should run bundle when js change.

## app

  ```npm deploy``` should bundle everything and install the app on your connected device.

