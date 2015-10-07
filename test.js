"use strict";
var randomJpeg = require( './index');
var colors = require('./colors.json');


var colorArray  = [];
for( var o in colors){
    colorArray.push( colors[o] );
}

randomJpeg.saveJPEG( colorArray, 800, 600, 5, 4,  100, __dirname + "/test/out_1.jpeg");
