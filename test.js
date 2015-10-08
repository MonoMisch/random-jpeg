"use strict";
var randomJpeg = require( './index');
var colors = require('./colors.json');


var colorArray1  = [];
for( var o in colors){
    colorArray1.push( colors[o] );
}
var colorArray2 = [colors.red, colors.black, colors.white, colors.blue];

var imageOptions = {
    colors: [[255, 0, 0], [255, 255, 255], [0, 0, 0], [0, 0, 255]],
    width: 800,
    height: 600,
    columns: 3,
    rows: 2,
    allowSameColorTouch: false,
    quality: 100
};
randomJpeg.writeJpeg( __dirname + "/test/out_0.jpeg", imageOptions, function(err){
    if(err) { console.error( "error test1: " + err ); }
});


var imageOptions1 = {
  colors: colorArray1,
    width: 600,
    height: 500,
    columns: 4,
    rows: 3,
    allowSameColorTouch: false,
    quality: 100
};
randomJpeg.writeJpeg( __dirname + "/test/out_1.jpeg", imageOptions1, function(err){
   if( err ){
       console.error( "error test1: " + err );
   }
});

var imageOptions2 = {
    colors: colorArray2,
    width: 800,
    height: 600,
    columns: 6,
    rows: 5,
    allowSameColorTouch: false,
    quality: 100
};

randomJpeg.writeJpeg(  __dirname + "/test/out_2.jpeg", imageOptions2);

randomJpeg.writeJpeg( __dirname + "/test/out_3.jpeg");