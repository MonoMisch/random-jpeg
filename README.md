# random-jpeg
a random jpeg generator which generates jpegs with
rectangular pattern.


![example1](doc/example0.jpg )  


## how to install

```
npm install random-jpeg --save
```


## example

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
* quality:  jpeg encoding quality

![example1](doc/example2.jpg )
