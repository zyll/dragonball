dragonball
==========

Sorry but expect to see experimental and rought stuff here.
Only run on android device. Should be run in a browser with some minor change.

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

