# gulp-imgsize-inline 

Inline image width and height dynamically on HTML files

## Install

```bash
$ npm install --save-dev gulp-imgsize-inline
```

## Usage

This is an example of `gulpfile.js`.

```javascript
import gulp from 'gulp';
import imgSizeInline from 'gulp-imgsize-inline';

gulp.task('imgSizeInline', function () {
  gulp.src('./*.html')
    .pipe(imgSizeInline())
    .pipe(gulp.dest('./dest'));
});
```

You can pass an object to `imgSizeInline()` as argument such as following:

```javascript
gulp.task('imgSizeInline', () => {
  gulp.src('./*.html')
    .pipe(imgSizeInline({
      path: './', // default ''
      fileTypes: ['.html'], // default ['.html', '.htm']
      classMultipliers: {
          'x2': 2
      }, // default {}
    }))
    .pipe(gulp.dest('./dest'));
});
```

#### options

Type: `object`

##### path

Type: `string`\
Default: `''`

Path to where the images are located in case the src attribute on the image is not enough to locate them on the system.


##### fileTypes

Type: `array`\
Default: `['.html', '.htm'.]`

Array of file extensions to be processed, anything else will be ignored.

##### classMultipliers

Type: `object`\
Default: `{}`

An object with class names as keys and a number to multiply by as the value. The following example will multiply the width and height of all of the images that have the class of `x2` by 2.
Useful for when images @x2 are used for higher ppi monitors.

```
{
    x2: 2
}
```
