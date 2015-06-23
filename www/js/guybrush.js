var H = require('highland');

function normalize(touch) {
  return {x: touch.pageX, y: touch.pageY, id: touch.identifier+''};
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
  console.log('me');
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
    return {id: touch.identifier+''};
  });
}

function nearestFrom(keys) {
  var pawn = contacts[keys[0]];
  if(keys.length < 3) return [];
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
  var i, next;
  var pawns = [];
  var keys = Object.keys(contacts);
  var pawn = nearestFrom(keys);
  while(pawn.length) {
    pawns.push(pawn);
    pawn.forEach(function(p) { // remove used contact
      keys.splice(keys.indexOf(p.id), 1);
    });
    pawn = nearestFrom(keys);
  }
  return pawns;
}

var contacts = {};
var pawns = [];

module.exports = function guybrush(el) {
  return H([
    H('touchstart', el).map(start),
    H('touchmove', el).map(moving),
    H('touchend', el).map(end)
  ]).merge().map(checkForPawn);
};
