/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var Guybrush = require('./guybrush.js');
var H = require('highland');
var $ = require('jquery');
var app = {
  // Application Constructor
  initialize: function() {
    $(document).ready(this.onDeviceReady.bind(this));
  },
  onDeviceReady: function() {
    var guybrush = new Guybrush($('body'));
    var scene = new Scene();
    guybrush.stream.each(scene.draw.bind(scene));
  }
};
function Scene() {
  this.el = $('<canvas>')
  this.el[0].height = $(window).height();
  this.el[0].width  = $(window).width();
  $('body').append(this.el);
  this.ctx = this.el[0].getContext('2d');
};

Scene.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.el.width, this.el.height);
};

Scene.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.el[0].width, this.el[0].height);
}
Scene.prototype.draw = function(pawns) {
  this.clear();
  if(pawns.length === 0) return;
  var tup;
  for(var i = 0; i < pawns.length; i++) {
    tup = pawns[i];
    var distance = tup[0].distance + tup[1].distance + tup[2].distance;
    oldMax = Math.max(oldMax, distance);
    oldMin = Math.min(oldMin, distance);
    this.ctx.fillStyle = distance > 250 ? "black" : "red";
    this.ctx.beginPath();
    var G = barycentre(tup);
    var A = faraway(tup[0], G);
    var B = faraway(tup[1], G);
    var C = faraway(tup[2], G);
    this.ctx.moveTo(A.x, A.y);
    this.ctx.lineTo(B.x, B.y);
    this.ctx.lineTo(C.x, C.y);
    this.ctx.fill();
  }
};
window.oldMax = 0, window.oldMin = Infinity;
function barycentre(tup) {
  return {
    x: (tup[0].x + tup[1].x + tup[2].x) / 3,
    y: (tup[0].y + tup[1].y + tup[2].y) / 3
  };
}

function faraway(point, g) {
  return {
    x: point.x - 4 * (g.x - point.x),
    y: point.y - 4 * (g.y - point.y)
  };
}

var contacts = {};
app.initialize();
