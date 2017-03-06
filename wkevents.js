// ==UserScript==
// @name         WK Events
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.wanikani.com/review/session
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var oldHide = $.fn.hide;
    $.fn.hide = function(){this.trigger(new jQuery.Event('hide')); return oldHide.apply(this, arguments);};
    var oldShow = $.fn.show;
    $.fn.show = function(){this.trigger(new jQuery.Event('show')); return oldShow.apply(this, arguments);};
})();