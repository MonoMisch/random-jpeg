"use strict";
var randomJpeg = require( "./index");
var colors = require("./colors.json");
var _ = require("lodash");

var colorArray1  = [];
for( var o in colors){
    colorArray1.push( colors[o] );
}
var colorArray2 = [colors.red, colors.black, colors.white, colors.blue];
var colorArray3 = [colors.gray, colors.teal, colors.black, colors.white, colors.aquamarine, colors.steelblue, colors.hotpink, colors.blueviolet];
var colorArray4 = [colors.gray, colors.teal, colors.black, colors.forestgreen, colors.aquamarine, colors.steelblue, colors.powderblue, colors.maroon];
var imageOptions = {
    colors: [[255, 0, 0], [255, 255, 255], [0, 0, 0], [0, 0, 255]],
    width: 800,
    height: 600,
    columns: 3,
    rows: 2,
    allowSameColorTouch: false,
    quality: 100
};
randomJpeg.writeJPEGSync( __dirname + "/test/out_0.jpeg", imageOptions, function(err){
    if(err) { console.error( "error test1: " + err ); }
});
console.log( randomJpeg.colors);

console.log(_.values(randomJpeg.colors));

var imageOptions1 = {
    colors: _.values(randomJpeg.colors),
    width: 1200,
    height: 800,
    columns: 8,
    rows: 6,
    allowSameColorTouch: false,
    quality: 100
};
randomJpeg.writeJPEG( __dirname + "/test/out_1.jpeg", imageOptions1, function(err){
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

randomJpeg.writeJPEG(  __dirname + "/test/out_2.jpeg", imageOptions2);

randomJpeg.writeJPEG( __dirname + "/test/out_3.jpeg");