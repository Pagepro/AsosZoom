#AsosZoom 1.0.0
##Asos style image magnifier as jQuery plugin

###Why should I use this plugin?
* ???
* ???

For complete documentation, examples, and a good time, visit:

[http://??](http://??)

Written by: Pagepro - [http://pagepro.pl](http://pagepro.pl)

###License
Released under the MIT license - http://opensource.org/licenses/MIT

##Installation

###Step 1: Link required files

First and most important, the jQuery library needs to be included (no need to download - link directly from Google). Next, download the package from this site and link the AsosZoom CSS file (for the theme) and the AsosZoom Javascript file.

```html
<!-- jQuery library (served from Google) -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<!-- AsosZoom Javascript file -->
<script src="/js/asos.zoom.min.js"></script>
<!-- AsosZoom CSS file -->
<link href="/lib/asos.zoom.css" rel="stylesheet" />
```

###Step 2: Create HTML markup

Create a `<a class="asosZoom">` element, with href pointing to big image.

```html
<a class="asos-zoom" href="/images/big-image.jpg"><img src="/images/thumbnail.jpg" /></a></li>
```

###Step 3: Call the asosZoom

Call `.asosZoom()` on `<a class="asos-zoom">`. Note that the call must be made inside of a `$(document).ready()` call, or the plugin will not work!

```javascript
$(document).ready(function(){
  $('.asos-zoom').asosZoom();
});
```

##Configuration options

###General

**zoom**
Type of zoom dimension
```
default: 'horizontal'
options: 'horizontal', 'vertical'
```

**speed**
Zoom fadeIn effect transition duration (in ms)
```
default: 500
options: integer
```

**closeButtonTemplate**
HTML template for close button
```
default: '<a href="#" id="asosZoom__content__close">{{closeText}}</a>'
options: string
```

**closeText**
Text displayed on close button
```
default: 'x'
options: string
```

**thumbnailPosition**
Position of thumbnails
```
default: 'vertical'
options: 'vertical', 'horizontal'
```

```

###Thumbnails

**thumbnails**
Display thumbnails in gallery mode
```
default: true
options: boolean (true / false)
```

###Controls

**controls**
Display left / right arrows in gallery mode
```
default: true
options: boolean (true / false)
```

**arrowsTemplate**
HTML template for left / right arrows
```
default: '<a href="#" id="asosZoom__content__next">{{nextText}}</a><a href="#" id="asosZoom__content__prev">{{prevText}}</a>'
options: string
```

**nextText**
Text to be used for the "Next" control
```
default: '&gt;'
options: string
```

**prevText**
Text to be used for the "Prev" control
```
default: '&lt;'
options: string
```

###Overlay

**overlayColor**
Color of overlay under the zoom popup
```
default: '#000000'
options: string
```

**overlayOpacity**
Opacity of overlay under the zoom popup
```
default: '0.7'
options: int
```

###Callbacks

**onDisplayed**
Executes immediately after zoom popup is displayed
```
default: function(){}
options: function(){ // your code here }
```

**onClose**
Executes immediately after zoom popup is displayed
```
default: function(){}
options: function(){ // your code here }
```

Long live Zep.