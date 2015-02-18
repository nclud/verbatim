Verbatim - V 0.1.4
===========

*Important: Verbatim is still in development beta and has some minor issues in Firefox. While it doesn't work in IE, it won't break anything.*

Verbatim is a jQuery plugin that allows deep-linking directly to content. When installed, website visitors will be able to highlight text content (or select images), generate a direct link to the content, and share the link via Twitter. When a user clicks on the generated link, the page will scroll and highlight the selected content. It's magic.

[See the Demo](http://bit.ly/1xBkb95)

Verbatim was built by [Ramsay Lanier](https://github.com/ramsaylanier) and [Maxim Leyzerovich](https://github.com/duqe) from [nclud](http://nclud.com). 

Verbatim is released under the [GNU GPLv3 license](http://www.gnu.org/licenses/gpl.html). 


##Installation

Verbatim is available as a jQuery plugin. It is also available as a [wordpress plugin](http://wordpress.org), [craft plugin](https://github.com/nclud/verbatim-craft), and a [meteor.js package](http://atmosphere.js). 

1 - Ensure that jQuery included inside of the head tag.

```
 <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
```

2 - Download the Verbatim source from either the "src" folder or the "prod" folder (the latter is minified), and link to it after jQuery.

```
<script type="text/javascript" src="js/verbatim.js"></script>
```

3 - Include the Verbatim CSS. Either incorporate it into your existing CSS file, or link to it inside of your head tag.

```
<link rel="stylesheet" type="text/css" href="/css/verbatim.css"/>
```

##Usage

To use Verbatim, simply call it inside of a jQuery Document.ready() call, like so:

```
$(function(){
  $(document).verbatim();
});
```

Or, with settings:

```
$(document).verbatim({
 animated: true,
 animationSpeed: 2000,
 highlightParent: false,
 highlightColor: 'rgb(134, 21, 210)',
 bitlyToken: '123456789012345980700123123'
});
```

##Settings

Verbatim comes with the following default settings:

###highlightParent
**default**: true

**type**: boolean

Set highlightParent to true if you want to highlight the parent element of the text that is selected.

###searchContainer
**default**: 'body'

**type**: jQuery selector

Set the container that Verbatim will search for selected text. This will also limit the area in which content can be selected. If you only want a certain container to be selectable, make sure you change this setting using a jQuery selector(example: .content or #mainContainer);

###highlightedClass
**default**: 'highlight'

**type**: string

Verbatim wraps the found content in a span element which is assigned a class, used to highlight the found text. You can change this class if you'd like, but make sure you update your CSS. 


###highlightColor
**default**: 'rgb(255,255,0)'

**type**: rgb color string

Pretty self-explanatory: this setting allows you to change the background color of the text when it is both selected and when it is found.


###selectedClass
**deault**:'verbatim-selected-text'

**type**: string

When selected text from a Verbatim enabled container, Verbatim wraps the selected text in a span element. You can change this class if you'd like, but make sure you update your CSS. 

###buttonClass
**default**: 'verbatim-button-container'

**type**: string

Verbatim appends a div element with two buttons insode of the span element that wraps the selected text. You can change the class of the buttom container, but make sure you update your CSS. 

###animated
**default**: true

**type**:boolean

Animates scrolling to the content. Set to false to prevent animated scrolling.

###animationSpeed
**default**: 2000

**type**: integer

Sets the scrolling speed.

###scrollingOffset
**default**: 200

**type**: integer

Sets the amount of offset(in pixels) from the top of found content. Verbatim will scroll to the found content's offset less the amount of offset. This allows for some spacing between the top of the window and the found content.


###allowImages
**default**: true

**type**: boolean

By default, Verbatim will also allow users to select and share links to images as well. If you'd like to turn this feature off, sell allowImages to false.

##Using Bitly For Link Shortening

We highly recommend using Bitly to generate short links. The good news is that Verbatim will work with Bitly! All you need to do is add a [Bitly Authentication Token](http://dev.bitly.com/get_started.html). Simply add the token as a setting like so:

```
$(document).verbatim({
 bitlyToken: '123456789012345980700123123'
});
```

