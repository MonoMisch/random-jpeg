# random-jpeg
a random jpeg generator which generates jpegs with
rectangular pattern.


![example1](doc/example0.jpg )  


## how to install

```
npm install random-jpeg --save
```


## examples

```javascript
var randomJpeg = require('random-jpeg');

// with options and callback
var imageOptions = {
    colors: [[255, 0, 0],[255, 255, 255],[0, 0, 0],[0, 0, 255]],
    width: 800,
    height: 600,
    columns: 5,
    rows: 4,
    allowSameColorTouch: false,
    quality: 100
};
randomJpeg.writeJPEG(destination, imageOptions, callback);

// without any options or callback
randomJpeg.writeJPEG(destination);
```


### example with custom rng
```javascript
var randomJpeg = require('random-jpeg');
var faker = require('faker');
faker.seed( 4 ); // chosen by fair dice roll. guaranteed to be random :)

// with options and callback
var imageOptions = {
  rng: faker.random.number.bind( faker.random, { min: 0, max: 1, precision: .00001 } )
};
// will always produce the same "random" jpeg on every invocation now, useful for deterministic tests
randomJpeg.writeJPEG(destination, imageOptions, callback);
```


## methods

This module provides three public methods.
two of them are using the **imageOptions**-object:

**drawJPEG([imageOptions]){... return jpeg-buffer;};**

**writeJPEG(destination, [imageOptions], [callback]){ writes Filestream};**

**createBuffer([colorArray], [XPosArray], [YPosArray]){... return node-buffer;};**  
The length of the colorArray has to be (XPosArray.length - 1 * YPosArray.length - 1) 


## imageOptions

* colors:  Array of rgb-arrays [[r,g,b], [r,g,b]...,[r,g,b]], the selectable colors for the generator
* width:  width of resulting jpeg  
* height:  width of resulting jpeg  
* columns: number of rectangles in x-direction  
* rows: number of rectangles in x-direction  
* allowSameColorTouch: are rectangles with the same color connected allowed  
* quality: jpeg encoding quality
* rng: A custom random number generator. Should be a function
  returning a number in the range of [0, 1) just like
  `Math.random`. Will default to `Math.random` if not specified.

![example1](doc/example2.jpg )
