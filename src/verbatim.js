/*!
* Verbatim.js 1.1.0
*
* Copyright 2014, nclud http://nclud.com
* Released under the GNU GPLv3 license
* http://www.gnu.org/licenses/gpl.html
*
* Built by Ramsay Lanier and Maxim Leyzerovich from nclud
*
* 
*/

!function($){
	var verbatimLogo ='<svg version="1.1" id="verbatimLogo" class="verbatim-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><path fill="#FFFFFF" d="M9,10.1c-4,0.8-6.9,3.1-7.3,6.2c-0.2,1.8,0,3.7,1.1,5.2c1.5,2,3.2,3.1,6.2,2.8c1.5-0.1,1.7-1.4,1.1-1.6c-0.5-0.2-3.1-1.7-2.8-6c0.1-1.7,0.4-3.8,2.6-4.8C10.8,11.3,10,9.9,9,10.1z"/><path fill="#FFFFFF" d="M39.7,11.1c-1.5,9-6.9,16.3-10.8,23.2c-0.1,0.1-0.3,0.1-0.3-0.1c0.7-6.5,1.8-18,1.8-19.3s0.2-5.8-7.1-5.8s-11,3.2-11.8,7.3c-0.4,1.8,0.1,3.7,1.3,5.2c1.6,1.9,4.1,2.9,7.1,2.5c1.5-0.2,2-0.9,2-1.6c0-0.6-0.5-1.3-1.8-1.5c-0.5,0-2-0.2-2.1-3.1c0-1.3,0.3-2.2,1-2.9c0.7-0.7,1.4-1.2,2.9-1.1c1.5,0.1,1.7,1.4,1.7,2.1c0,0.6-1.3,21.6-0.3,26.2c0,0.1,0.1,0.1,0.1,0.1h7.8c0,0,0.1,0,0.1-0.1c3.6-5.1,15.2-25.4,16.7-31c0-0.1,0-0.2-0.1-0.2h-7.9C39.7,11,39.7,11.1,39.7,11.1z"/></svg>'
	var twitterLogo ='<svg version="1.1" id="twitterLogo" class="verbatim-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"> <path fill="#FFFFFF" d="M45,13.2c-1.4,0.6-2.9,1-4.5,1.2c1.6-1,2.8-2.5,3.4-4.3C42.4,11,40.8,11.7,39,12c-1.4-1.5-3.4-2.5-5.7-2.5c-4.3,0-7.8,3.5-7.8,7.8c0,0.6,0.1,1.2,0.2,1.8c-6.5-0.3-12.2-3.4-16-8.1c-0.7,1.1-1.1,2.5-1.1,3.9c0,2.7,1.4,5.1,3.5,6.5c-1.3,0-2.5-0.4-3.5-1c0,0,0,0.1,0,0.1c0,3.8,2.7,6.9,6.2,7.6c-0.7,0.2-1.3,0.3-2.1,0.3c-0.5,0-1,0-1.5-0.1c1,3.1,3.9,5.3,7.3,5.4c-2.7,2.1-6,3.3-9.7,3.3c-0.6,0-1.2,0-1.9-0.1c3.4,2.2,7.5,3.5,11.9,3.5c14.3,0,22.1-11.9,22.1-22.1c0-0.3,0-0.7,0-1C42.6,16.2,43.9,14.8,45,13.2z"/></svg>';
	var downY, upY;

	var defaults = {
		highlightParent: true,
		searchContainer: 'body',
		highlightedClass: 'highlight',
		highlightColor: '#FFFF00',
		selectedClass: 'verbatim-selected-text',
		buttonClass: 'verbatim-button-container',
		animated: true,
		animationSpeed: 2000,
		scrollingOffset: 200,
		allowImages: true
	}


	$.fn.verbatim = function(options){
		var hash = window.location.hash;
		hash = hash.replace("%C2%A0", "%20");
		var sanitizedHash = decodeURIComponent(hash).substr(1);
		var settings = $.extend({}, defaults, options);
		var selectedText = '';
		var withTwitter = false,
			twitterScriptAdded = false;
		var longURL, textURL;
		var isImage = false;

		var isFirefox = /Firefox/.test(navigator.userAgent);

		if (sanitizedHash.substr(0, 5) == "image"){
			sanitizedHash = sanitizedHash.substr(7);
			isImage = true;
		}

		var isIE = function(){

	      var ua = window.navigator.userAgent
	      var msie = ua.indexOf ( "MSIE " )

	      if ( msie > 0 )      // If Internet Explorer, return version number
	         return parseInt (ua.substring (msie+5, ua.indexOf (".", msie )))
	      else                 // If another browser, return 0
	         return 0

		}

		var findHash = function(sanitizedHash, settings){

			if (isImage && settings.allowImages){
				var targetImage = $("img[src$='" + sanitizedHash + "']");
				targetImage.addClass(settings.highlightedClass);

				targetImage.css({
					"outline": "5px solid " + settings.highlightColor
				})
			}

			else {
		        var sel = getSelected();

		        sel.collapse(document.body, 0);

		        while (window.find(sanitizedHash)) {

	        		if (isFirefox){
						document.body.contentEditable = "true";

						document.execCommand("HiliteColor", false, settings.highlightColor);
				        var anchorNode = sel.focusNode.parentNode;
				      	$(anchorNode).addClass(settings.highlightedClass);
			            sel.collapseToEnd();

				      	document.body.contentEditable = "false";

					} else {
						document.designMode = "on";

			            document.execCommand("HiliteColor", false, settings.highlightColor);
				        var anchorNode = sel.anchorNode.parentNode;
				      	$(anchorNode).addClass(settings.highlightedClass);
			            sel.collapseToEnd();

			             document.designMode = "off";
			         }

		        }

		        anchorNode = sel.anchorNode.parentNode;
		      	$(anchorNode).addClass(settings.highlightedClass);
			}

			if (settings.animated){
				$(function(){
					$('html, body').animate({scrollTop: 0}, 0);
				});

				$(window).load(function(){
					$('html, body').animate({scrollTop: $('.' + settings.highlightedClass).offset().top - parseInt(settings.scrollingOffset) }, parseInt(settings.animationSpeed) );
				});
			}

			if (settings.highlightParent){
				$('.' + settings.highlightedClass).parent().addClass(settings.highlightedClass);
			}
		}

		var getSelected = function(){
			if(window.getSelection)
				return window.getSelection(); 
			else if(document.getSelection)
				return document.getSelection(); 
			else {
				var selection = document.selection && document.selection.createRange();
		        if(selection.text) { 
		        	return selection.text; 
		        }
		        return false;
		    }
	        return false;
		}

		var insertCopyButton = function(target){

			//reset
			$('.' + settings.buttonClass).remove();
			$('.verbatim-text-area').remove();

			//if target is an image
			if (settings.allowImages && $(target).is('img') && !$(target).hasClass(settings.selectedClass)){

				var buttonContainer = document.createElement("div");
				buttonContainer.setAttribute("class", settings.buttonClass);
				buttonContainer.innerHTML = verbatimLogo + twitterLogo;

				//get images position inside of it's parent element
				var targetPos= $(target).position();

				//append buttons to DOM before image target
				$(target).before(buttonContainer);

				//set button container to image targets top left corner;
				$(buttonContainer).css({
					"top": targetPos.top,
					"left": targetPos.left
				})

				selectedText = "image: " + $(target).attr('src');
			}

			//if target is a text node
			else if (!$(target).hasClass(settings.selectedClass)){
				
				$('.' + settings.selectedClass).contents().unwrap();

				var buttonContainer = document.createElement("div");
				buttonContainer.setAttribute("class", settings.buttonClass);
				buttonContainer.innerHTML = verbatimLogo + twitterLogo;
				
				var sel = getSelected();

				if(!sel.isCollapsed){

					if (isFirefox){
						document.body.contentEditable = "true";

						document.execCommand("HiliteColor", false, settings.highlightColor);
				      	var anchorNode = sel.focusNode.parentNode;
				      	appendButton();

				      	document.body.contentEditable = "false";

					} else {
						document.designMode = "on";
						document.execCommand("HiliteColor", false, settings.highlightColor);
				      	var anchorNode = sel.anchorNode.parentNode;
				      	appendButton();

				      	document.designMode = "off";
					}
					
		            selectedText = sel.toString();
		        }
		    } 

		    function appendButton(){
		    	var target;
		    	$(anchorNode).addClass(settings.selectedClass).append(buttonContainer);

		    	if ((upY - downY) > 15)
		    		target = 0
		    	else
		    		target = ($(anchorNode).outerWidth() / 2) - $('.' + settings.buttonClass).width() / 2;
		
		    	$('.' + settings.buttonClass).css({
		      		"left": target
		      	})
		    } 
		}

		var copyURL = function(){
			$('.verbatim-text-area').remove();

			textURL = selectedText;
			longURL = window.location.origin + window.location.pathname + '#' + encodeURIComponent(textURL);

			console.log(longURL);

			if (settings.bitlyToken){
				$.getJSON(
				    "https://api-ssl.bitly.com/v3/shorten?", 
				    { 
				        "access_token": settings.bitlyToken,
				        "longUrl": longURL
				    },
				    function(response)
				    {
				    	if (response.status_code == 200){
				    		longURL = response.data.url;
				    		generateLink();
				    	}
				    }
				);
			} else {
				longURL = window.location.origin + window.location.pathname + '#' + encodeURIComponent(textURL);
				generateLink();
			}
		}

		var generateLink = function(){
			if (withTwitter){
				if (textURL.length > 112){
					textURL = textURL.substring(0, 112) + '...';
				}

				textURL = "\"" + textURL + "\""; 
				var twitterLink = document.createElement('a');
				twitterLink.href='https://twitter.com/intent/tweet?url=' + encodeURIComponent(longURL) + '&text=' + encodeURIComponent(textURL);
				document.body.appendChild(twitterLink);
				twitterLink.click();
			} else {
				var textArea = document.createElement("textArea");

				textArea.setAttribute("class", "verbatim-text-area");
				textArea.setAttribute("wrap", "off");

				$('.' + settings.buttonClass).append(textArea);

				$('.verbatim-text-area').val(longURL);
				textArea.select();
			}
		}

		if(! isIE){

			$(settings.searchContainer).on('mousedown', function(event){	
				downY = event.offsetY;
			});

			$(settings.searchContainer).on('mouseup', function(event){
				upY = event.offsetY;

				if ($(event.target).is('#verbatimLogo')){
					withTwitter = false;
					copyURL();
				} else if ($(event.target).is('#twitterLogo')){
					withTwitter = true;
					copyURL();
				} else if ($(event.target).hasClass('verbatim-text-area')){
					return false;
				} else 
					insertCopyButton(event.target);

			});

			if (sanitizedHash)
				findHash(sanitizedHash, settings);			
		}

	}

}(window.jQuery);
