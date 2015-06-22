var H = require('highland');

function normalize(touch) {
  return {x: touch.pageX, y: touch.pageY, id: touch.identifier+''};
}

function event2coord(event) {
  var tupplet = [];
  var touchs = event.originalEvent.changedTouches;
  for(var i = 0; i < touchs.length; i++) {
    tupplet.push(normalize(touchs[i]));
  }
  return tupplet;
}

function distanceTupplet(tupplet) {
  return [
    distance(tupplet[0], tupplet[1]),
    distance(tupplet[0], tupplet[2]),
    distance(tupplet[1], tupplet[2]),
  ].sort(ascFloatSort);
}
function ascFloatSort(a, b) {
    if(a < b) return -1;
    if(a > b) return 1;
    return 0;
  }

function distance(a, b) {
  return Math.sqrt(Math.pow((b.x - a.x), 2) + Math.pow(b.y - a.y, 2));
}

function start(event) {
  event.preventDefault();
  return [].map.call(event.originalEvent.changedTouches, function(touch) {;
    return contacts[touch.identifier] = normalize(touch);
  });
}

function moving(event) {
  event.preventDefault();
  return [].map.call(event.originalEvent.changedTouches, function(touch) {;
    return contacts[touch.identifier] = normalize(touch);
  });
}

function end(event) {
  event.preventDefault();
  return [].map.call(event.originalEvent.changedTouches, function(touch) {;
    delete contacts[touch.identifier];
    return {id: touch.identifieri+''};
  });
}

function nearestFrom(pawn, keys) {
  if(keys.length < 3 || keys.indexOf(pawn.id) < 0) return [];
  var m = keys.map(function(to) {
    return {
      id: contacts[to].id,
      distance: distance(pawn, contacts[to]),
      x: contacts[to].x,
      y: contacts[to].y
    };
  }).sort(function(a, b) {
    return ascFloatSort(a.distance, b.distance);
  }).slice(0, 3);
  return m;
}

function checkForPawn(changed) {
  var pawns = [];
  var keys = Object.keys(contacts);
  var pawn = nearestFrom(changed.shift(), keys);
  console.log(pawn);
  while(pawn.length === 3) {
    pawns.push(pawn);
    pawn.forEach(function(p) { // remove used contact
      var i;
      if(changed.length) {
        i = changed.indexOf(p.id);
        if(i >= 0 ) changed.splice(i, 1);
      }
      var i;
      if(keys.length) {
        i = keys.indexOf(p.id);
        if(i >= 0 ) keys.splice(i, 1);
      }
    });
    pawn = nearestFrom(changed.shift() || keys[0], keys);
  }
  return pawns;
}

function has3side(d) {
  return d.length === 3;
}
var contacts = {};
var pawns = [];

module.exports = function Guybrush(el) {
  this.stream = H().map(checkForPawn);
  var s1 = H('touchstart', el).map(start);
  var s2 = H('touchmove', el).map(moving);
  var s3 = H('touchend', el).map(end);
  s1.pipe(this.stream);
  s2.pipe(this.stream);
  s3.pipe(this.stream);
};
