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
  $(document).verbatim()}
}
```

##Settings

Verbatim comes with the following default settings:
highlightParent: true,
searchContainer: 'body',
addedClass: 'verbatim-found-content',
highlightedClass: 'highlight',
highlightColor: '#FFFF00',
selectedClass: 'verbatim-selected-text',
buttonClass: 'verbatim-button-container',
defaultStyling: true,
animated: true,
animationSpeed: 2000,
scrollingOffset: 200
