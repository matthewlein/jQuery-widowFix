/*
 * jQuery WidowFix Plugin
 * http://matthewlein.com/widowfix/
 * Copyright (c) 2010 Matthew Lein
 * Version: 1.3 (10/25/2010)
 * Dual licensed under the MIT and GPL licenses
 * Requires: jQuery v1.4 or later
 */

(function( $ ){

	jQuery.fn.widowFix = function(userOptions) {
		
		var defaults = {
			letterLimit: null,
			prevLimit: null,
			linkFix: false
		};
		
		var wfOptions = $.extend(defaults, userOptions);
		
		return this.each(function(){
			
			var $this = $(this),
            linkFixLastWord;
			
			if (wfOptions.linkFix) {
				var $linkHolder = $this.find('a:last');
				//find the anchors and wrap them up with a <var> tag to find it later
				$linkHolder.wrap('<var>');
				//store the anchor inside
				var $lastLink = $('var').html();
				//get the real length of the last word
				linkFixLastWord = $linkHolder.contents()[0];
				//remove the anchor
				$linkHolder.contents().unwrap();
			}
			
			var contentArray = $(this).html().split(' ');
			var lastWord = contentArray.pop();
			
			function checkSpace(){
				if (lastWord === ''){
					//trailing space found, pop it off and check again
					lastWord = contentArray.pop();
					checkSpace();
				}
			}
			checkSpace();
			
			var prevWord = contentArray[contentArray.length-1];
			
			//if linkFix is on, check for the letter limit
			if(wfOptions.linkFix) {
				//if the last word is longer than the limit, stop the script
				if (wfOptions.letterLimit !== null &&
					linkFixLastWord.length >= wfOptions.letterLimit
					) {
						$this.find('var').each(function(){
							$(this).contents().replaceWith($lastLink);
							$(this).contents().unwrap();
						});
						return;
				//or if the prev word is longer than the limit
				} else if (wfOptions.prevLimit !== null &&
					prevWord.length >= wfOptions.prevLimit
					) {
						$this.find('var').each(function(){
							$(this).contents().replaceWith($lastLink);
							$(this).contents().unwrap();
						});
						return;
				}
				
					
			} else {
				//if the last word is longer than the limit, stop the script
				if (wfOptions.letterLimit !== null &&
					lastWord.length >= wfOptions.letterLimit
					) {
						return;
				} else if (wfOptions.prevLimit !== null &&
					prevWord.length >= wfOptions.prevLimit
					) {
						return;
				}
			}
			
			var content = contentArray.join(' ') + '&nbsp;' + lastWord;
			$this.html(content);
			
			if (wfOptions.linkFix) {
				
				//find the var and put the anchor back in, then unwrap the <var>
				$this.find('var').each(function(){
					$(this).contents().replaceWith($lastLink);
					$(this).contents().unwrap();
				});
			}
			
		});
		
	};

})( jQuery );