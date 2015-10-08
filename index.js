"use strict";

// node
var path = require('path');
var fs = require('fs');

// npm
var jpeg = require('jpeg-js');

// intern
var colors = require( path.join( __dirname, "/colors.json") );


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


function generateExtendedColorArray( desiredColors, columns, rows, sameColorFollowAllow){
    var extColors = [];
    var nrOfTiles = columns * rows;
    var index;

    if( sameColorFollowAllow ) {
        for( var i = 0; i < nrOfTiles; i++ ) {
            index = Math.floor( Math.random() * desiredColors.length );
            extColors.push( desiredColors[index]);
        }
    }else{
        var indexTileLeft = -667;
        var columnPos;
        var indicesTilesRowAbove = new Array(columns);
        while( extColors.length < nrOfTiles ){
            columnPos = extColors.length % columns;
            index = Math.floor( Math.random() * desiredColors.length );
            if( index != indexTileLeft && index != indicesTilesRowAbove[columnPos]) {
                indexTileLeft = index;
                indicesTilesRowAbove[columnPos] = index;
                extColors.push( desiredColors[index]);
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
    var PosPixelBuffer = 0;
    var currentTile = 0;
    for( var i = 0; i < (ys.length - 1); i++) {
        for( var currentY = ys[i]; currentY < ys[i + 1]; currentY++){
            currentTile = i * (xs.length - 1);
            for( var k = 0; k < (xs.length - 1); k++){
                for( var currentX = xs[k]; currentX < xs[k + 1]; currentX++){
                    buffer[PosPixelBuffer++] = selectedColors[currentTile][0]; // red
                    buffer[PosPixelBuffer++] = selectedColors[currentTile][1]; // green
                    buffer[PosPixelBuffer++] = selectedColors[currentTile][2]; // blue
                    buffer[PosPixelBuffer++] = 0xFF; // alpha
                }
                currentTile++;
            }
        }
    }
    return buffer;
};


randomJPEG.encodeImage = function ( buffer, width, height, quality) {
    var rawImageData = {
        data: buffer,
        width: width,
        height: height
    };
    return  jpeg.encode( rawImageData, quality);
};


randomJPEG.drawJPEG = function( colors, width, height, nrOfColumns, nrOfRows, sameColorFollowAllow, quality ) {
    var extColors = generateExtendedColorArray( colors, nrOfColumns, nrOfRows, sameColorFollowAllow);
    var xs = generateDimArray(width, nrOfColumns);
    var ys = generateDimArray(height, nrOfRows);

    var buffer = randomJPEG.createBuffer( extColors, xs, ys);
    return randomJPEG.encodeImage( buffer, width, height, quality);
};




randomJPEG.saveJPEG = function ( colors, width, height, nrOfColumns, nrOfRows,sameColorFollowAllow, quality, destination, callback) {
    var jpegdata = randomJPEG.drawJPEG( colors, width, height, nrOfColumns, nrOfRows, sameColorFollowAllow, quality );
    var stream = fs.createWriteStream(destination);
    stream.on("open", function () {
        stream.write(jpegdata.data);
        stream.end();
        if(callback) {
            callback(null)
        }
    });
    stream.on('error', function() {
        if( callback){
            callback(error);
        }

    });
};


module.exports = randomJPEG;