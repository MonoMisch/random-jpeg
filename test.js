"use strict";
var randomJpeg = require( './index');
var colors = require('./colors.json');


var colorArray1  = [];
for( var o in colors){
    colorArray1.push( colors[o] );
}

var colorArray2 = [colors.red, colors.black, colors.white, colors.blue];

randomJpeg.saveJPEG( colorArray1, 800, 400, 2, 3, true,  100, __dirname + "/test/out_1.jpeg");
randomJpeg.saveJPEG( colorArray2, 800, 600, 5, 4, false,  100, __dirname + "/test/out_2.jpeg");