# random-jpeg
a random jpeg generator which generates jpegs with
rectangular patterns.

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
    height: 400,
    columns: 3,
    rows: 2,
    allowSameColorTouch: false,
    quality: 100
};
randomJpeg.writeJpeg(destination, imageOptions, callback);

// without any options or callback
randomJpeg.writeJpeg(destination);
```
