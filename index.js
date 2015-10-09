"use strict";

// node
var path = require('path');
var fs = require('fs');

// npm
var jpeg = require('jpeg-js');

var colors = require( path.join(__dirname, '/colors.json'));

function randomJPEG () {

}

function compareNumbers(a, b) {
    return a - b;
}

function generateDimArray( dimlenght, nrOfTilesInDim ) {
    var result = [0];
    result.push( dimlenght);
    for( var i = 0; i < nrOfTilesInDim -1; i++) {
        result.push( Math.floor( Math.random() * dimlenght ) );
    }
    return result.sort(compareNumbers);
}


function generateExtendedColorArray( imageOptions){
    var extColors = [];
    var nrOfTiles = imageOptions.columns * imageOptions.rows;
    var index;

    if( imageOptions.colors === undefined){
        var nrOfDefaultColors = 6;
        imageOptions.colors = new Array( nrOfDefaultColors );
        var colorArray  = [];
        for( var o in colors){
            colorArray.push( colors[o] );
        }
        // TODO same color could be chosen several times --> without imageOptions.colors
        // TODO     allowSameColorTouch doesnt work correctly
        for( var j = 0; j < nrOfDefaultColors; j++){
            index = Math.floor( Math.random() * colorArray.length );
            imageOptions.colors[j] = colorArray[index];
        }
    }

    if( imageOptions.allowSameColorTouch ) {
        for( var i = 0; i < nrOfTiles; i++ ) {
            index = Math.floor( Math.random() * imageOptions.colors.length );
            extColors.push( imageOptions.colors[index]);
        }
    }else{
        var indexTileLeft = -667;
        var columnPos;
        var indicesTilesRowAbove = new Array(imageOptions.columns);
        while( extColors.length < nrOfTiles ){
            columnPos = extColors.length % imageOptions.columns;
            index = Math.floor( Math.random() * imageOptions.colors.length );
            if( index != indexTileLeft && index != indicesTilesRowAbove[columnPos]) {
                indexTileLeft = index;
                indicesTilesRowAbove[columnPos] = index;
                extColors.push( imageOptions.colors[index]);
            }
        }
    }
    return extColors;
}


randomJPEG.createBuffer = function( selectedColors, xs, ys ) {
    var width = xs[xs.length - 1];
    var height = ys[ys.length - 1];
    var fieldsPerPixel = 4;
    var buffer = new Buffer( width * height * fieldsPerPixel);
    var bufferPos = 0;
    var currentTile = 0;
    for( var i = 0; i < (ys.length - 1); i++) {
        for( var currentY = ys[i]; currentY < ys[i + 1]; currentY++){
            currentTile = i * (xs.length - 1);
            for( var k = 0; k < (xs.length - 1); k++){
                for( var currentX = xs[k]; currentX < xs[k + 1]; currentX++){
                    buffer[bufferPos++] = selectedColors[currentTile][0]; // red
                    buffer[bufferPos++] = selectedColors[currentTile][1]; // green
                    buffer[bufferPos++] = selectedColors[currentTile][2]; // blue
                    buffer[bufferPos++] = 0xFF; // alpha
                }
                currentTile++;
            }
        }
    }
    return buffer;
};


randomJPEG.encodeImage = function ( buffer, imageOptions) {
    var rawImageData = {
        data: buffer,
        width: imageOptions.width,
        height: imageOptions.height
    };
    return  jpeg.encode( rawImageData, imageOptions.quality);
};


randomJPEG.drawJPEG = function( imageOptions ) {
    if( imageOptions === undefined) {
        imageOptions = {}
    }
    if( imageOptions.width === undefined ){
        imageOptions.width = 800;
    }
    if( imageOptions.height === undefined ){
        imageOptions.height = 600;
    }
    if( imageOptions.columns === undefined ){
        imageOptions.columns = 5;
    }
    if( imageOptions.rows === undefined ){
        imageOptions.rows = 4;
    }
    var extColors = generateExtendedColorArray( imageOptions);
    var xs = generateDimArray(imageOptions.width, imageOptions.columns);
    var ys = generateDimArray(imageOptions.height, imageOptions.rows);

    var buffer = randomJPEG.createBuffer( extColors, xs, ys);
    return randomJPEG.encodeImage( buffer, imageOptions);
};


randomJPEG.writeJpeg = function ( destination, imageOptions, callback) {
    var jpegdata = randomJPEG.drawJPEG(imageOptions);
    var stream = fs.createWriteStream(destination);
    stream.on('open', function () {
        stream.write(jpegdata.data);
        stream.end();
        if(callback) {
            callback(null)
        }
    });
    stream.on('error', function(error) {
        if( callback){
            callback(error);
        }

    });
};


module.exports = randomJPEG;
