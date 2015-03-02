/*!
* Verbatim.js 1.5.0
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
	var twitterLogo ='<svg version="1.1" id="twitterLogo" class="verbatim-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"> <path fill="#FFFFFF" d="M45,13.2c-1.4,0.6-2.9,1-4.5,1.2c1.6-1,2.8-2.5,3.4-4.3C42.4,11,40.8,11.7,39,12c-1.4-1.5-3.4-2.5-5.7-2.5c-4.3,0-7.8,3.5-7.8,7.8c0,0.6,0.1,1.2,0.2,1.8c-6.5-0.3-12.2-3.4-16-8.1c-0.7,1.1-1.1,2.5-1.1,3.9c0,2.7,1.4,5.1,3.5,6.5c-1.3,0-2.5-0.4-3.5-1c0,0,0,0.1,0,0.1c0,3.8,2.7,6.9,6.2,7.6c-0.7,0.2-1.3,0.3-2.1,0.3c-0.5,0-1,0-1.5-0.1c1,3.1,3.9,5.3,7.3,5.4c-2.7,2.1-6,3.3-9.7,3.3c-0.6,0-1.2,0-1.9-0.1c3.4,2.2,7.5,3.5,11.9,3.5c14.3,0,22.1-11.9,22.1-22.1c0-0.3,0-0.7,0-1C42.6,16.2,43.9,14.8,45,13.2z"/></svg>';

	var defaults = {
		highlightParent: true,
		searchContainer: 'body',
		highlightedClass: 'highlight',
		highlightColor: 'rgb(255,255,0)',
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
		var twitterScriptAdded = false;
		var longURL, textURL;
		var isImage = false;
		var selectionChange = false;

		var isFirefox = /Firefox/.test(navigator.userAgent);
		var isiOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );

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

		        	document.body.spellcheck = false;

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

			$('.' + settings.buttonClass).removeClass('on-page');
			setTimeout(function(){
				$('.' + settings.buttonClass).remove();
			}, 300);
			
			if (!$(target).hasClass(settings.selectedClass)){
				var buttonContainer = document.createElement("div");
				buttonContainer.setAttribute("class", settings.buttonClass);
				buttonContainer.innerHTML = '<p class="verbatim-info">Share this selection:</p>'

				//if target is an image
				if (settings.allowImages && $(target).is('img')){
						selectedText = "image: " + $(target).attr('src');
						appendButton();
				} else {
				
					var sel = getSelected();

					if(!sel.isCollapsed){
			            selectedText = sel.toString();
			            appendButton();
			        }
			    }
		    } 

		    function appendButton(){
		    	var target;
		    	setTimeout(function(){
		    		$('body').append(buttonContainer);
		    		copyURL();
		    	}, 310);

		    	setTimeout(function(){
		    		$(buttonContainer).addClass('on-page');
		    	}, 320);
		    } 
		}

		var copyURL = function(){
			// $('.verbatim-text-area').remove();

			textURL = selectedText;
			longURL = window.location.origin + window.location.pathname + '#' + encodeURIComponent(textURL);

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
				    	} else {
				    		longURL = window.location.origin + window.location.pathname + '#' + encodeURIComponent(textURL);
				    	}

				    	generateLink();
				    }
				);
			} else {
				longURL = window.location.origin + window.location.pathname + '#' + encodeURIComponent(textURL);
				generateLink();
			}
		}

		var generateLink = function(){
			//build textarea to contain shortlink
			var textArea = document.createElement("textarea");

			textArea.setAttribute("class", "verbatim-text-area");
			textArea.setAttribute("wrap", "off");

			$('.' + settings.buttonClass).append(textArea);

			$('.verbatim-text-area').text(longURL);


			//build twitter link
			if (textURL.length > 112){
				textURL = textURL.substring(0, 112) + '...';
			}

			textURL = "\"" + textURL + "\""; 
			var twitterLink = document.createElement('a');
			twitterLink.setAttribute("class", 'verbatim-twitter-link');
			twitterLink.setAttribute("target", "_blank");
			twitterLink.href='https://twitter.com/intent/tweet?url=' + encodeURIComponent(longURL) + '&text=' + encodeURIComponent(textURL);
			$('.' + settings.buttonClass).append(twitterLink);
			$(twitterLink).append(twitterLogo);
			twttr.widgets.load();
		}

		if(! isIE()){

			if (isiOS){
				var timeout;
				var selectable = false;

				$(settings.searchContainer).on('touchend', function(event){
					if ($(event.target).hasClass('verbatim-text-area')){
						selectable = false;
						$(event.target).select();
						return false;
					} else {
						selectable = true;
					}
				});

				function startCheck(){
					resetCheck();
					timeout = setTimeout(function(){
						checkSelection()
					}, 500);
				}

				function checkSelection(){
					selectionChange = false;
					insertCopyButton($('body'));
				}

				function resetCheck(){
					clearTimeout(timeout);
				}

				document.addEventListener("selectionchange", function() {
					if (selectable){
						startCheck();
						selectionChange = true;
					}
				}, false);
			} else {
				$(settings.searchContainer).on('mouseup', function(event){

					if ($(event.target).hasClass('verbatim-text-area')){
						$(event.target).select();
						return false;
					} else {
						insertCopyButton(event.target);
					}
				});
			}
			if (sanitizedHash)
				findHash(sanitizedHash, settings);			
		}

	}

}(window.jQuery);
