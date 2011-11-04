/*
 * jQuery WidowFix Plugin
 * http://matthewlein.com/widowfix/
 * Copyright (c) 2010 Matthew Lein
 * Version: 1.3.2 (7/23/2011)
 * Dual licensed under the MIT and GPL licenses
 * Requires: jQuery v1.4 or later
 */



// check for HTML entities too

(function($){
    $.widowFix = function(el, options){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        
        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
        
        // Add a reverse reference to the DOM object
        base.$el.data("widowFix", base);
        
        base.init = function(){
            base.options = $.extend({},$.widowFix.defaultOptions, options);
            
            // Put your initialization code here
        };
        
        
        base.functionName = function(paramaters){
         
        };
        
        // Run initializer
        base.init();
    };
    

    $.widowFix.defaultOptions = {
		letterLimit: null,
		prevLimit: null,
		linkFix: false,
		dashes: false
	};
    
    $.fn.widowFix = function(options){
        return this.each(function(){
            (new $.widowFix(this, options));
        });
    };
    
})(jQuery);