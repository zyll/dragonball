var H = require('highland');

function normalize(touch) {
  return {x: touch.pageX, y: touch.pageY};
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
  ].sort(function(a, b) {
    if(a < b) return -1;
    if(a > b) return 1;
    return 0;
  });
}

function distance(a, b) {
  return Math.sqrt(Math.pow((b.x - a.x), 2) + Math.pow(b.y - a.y, 2));
}

function start(event) {
  event.preventDefault();
  var id;
  var touchs = event.originalEvent.changedTouches;
  for(var i = 0; i < touchs.length; i++) {
    id = touchs[i].identifier;
    if(!contacts.hasOwnProperty(id)) {
      contacts[id] = normalize(touchs[i]);
    } else {
      console.log('duplicate identifier start');
    }
  }
}

function moving(event) {
  event.preventDefault();
  var touchs = event.originalEvent.changedTouches;
  for(var i = 0; i < touchs.length; i++) {
    id = touchs[i].identifier;
    if(contacts.hasOwnProperty(id)) {
      contacts[id] = normalize(touchs[i]);
    } else {
      console.log('unknown identifier moving ' + id);
    }
  }
}

function end(event) {
  event.preventDefault();
  var id;
  var touchs = event.originalEvent.changedTouches;
  for(var i = 0; i < touchs.length; i++) {
    id = touchs[i].identifier;
    if(contacts.hasOwnProperty(id)) {
      delete contacts[id];
    } else {
      console.log('unknown identifier end ' + id);
    }
  }
}
function checkForPawn() {
  var ids = Object.keys(contacts);
  if(ids.length < 3) return [];
  return ids.slice(0, 3).map(function(id) {return contacts[id];});
  // return distanceTupplet(tup);
}



function has3side(d) {
  return d.length === 3;
}
var contacts = {};

module.exports = function Guybrush(el) {
  this.stream = H().map(checkForPawn);
  var s1 = H('touchstart', el).map(start);
  var s2 = H('touchmove', el).map(moving);
  var s3 = H('touchend', el).map(end);
  s1.pipe(this.stream);
  s2.pipe(this.stream);
  s3.pipe(this.stream);
};
