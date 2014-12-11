verbatim-js
===========

Verbatim is a jQuery plugin that allows deep-linking directly to content. When installed, website visitors will be able to highlight text content, generate a direct link to the content, and share the link via Twitter. When a user clicks on the generated link, the page will scroll and highlight the selected content. It's magic.


##Installation

Verbatim is available as a jQuery plugin. It is also available as a [wordpress plugin](http://wordpress.org), and a [meteor.js package](http://atmosphere.js). 

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
}
```

Or, with settings:

```
$(document).verbatim({
 animated: true,
 animationSpeed: 2000,
 highlightParent: false,
 highlightColor: '#236075'
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
**default**: '#FFFF00'

**type**: hex color string

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


