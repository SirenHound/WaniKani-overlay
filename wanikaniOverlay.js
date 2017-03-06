// ==UserScript==
// @name         WK Overlay
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.wanikani.com/review/session
// @grant        none
// ==/UserScript==

var isKanji = function(ch){
    return /^[\u4e00-\u9faf]+$/.test(ch);
};
/** Gets the Kanji characters in a given string.
	* @param {string} vocabString -
	* @return {Array.<string>} An array of the kanji components in the given string
	*/
var getComponents = function(vocabString){
    return Array.prototype.filter.call(vocabString, function(ch){
        return isKanji(ch);
    }, this);
};


(function() {
    'use strict';
    var parentElement = $("#question");
    var overlay = document.createElement('div');
    overlay.setAttribute('lang', "ja");
    overlay.style.borderStyle = 'solid';
    overlay.style.borderColor = "lightblue";
    overlay.style.position = "absolute";
    parentElement[0].appendChild(overlay);

    $.jStorage.listenKeyChange('currentItem', function(){
        while (overlay.firstChild){
            overlay.removeChild(overlay.firstChild);
        }
        // Runs after span is changed, but is this guaranteed?
        overlay.style.display = 'none';
        overlay.style.width =  $("#character span").width() + 'px';
        overlay.style.height = $("#character span").height() + 'px';
        overlay.style.top = $("#character span").position().top + 'px';
        overlay.style.left = $("#character span").position().left + 'px';
        var prompt = $.jStorage.get('currentItem');
        if (prompt.voc){
            for (var ch in prompt.voc){
                var chSpan = document.createElement('span');
                chSpan.innerText = prompt.voc[ch];
                chSpan.style.fontSize = document.defaultView.getComputedStyle($("#character")[0], "").fontSize; // and lineHeight
                //chSpan.style.display = 'none';
                overlay.appendChild(chSpan);
                //$("#character").append(chSpan);
                if (!isKanji(prompt.voc[ch])){
                    chSpan.style.visibility = 'hidden';
                }
                else{
                    chSpan.style.backgroundColor = "cyan";
                }
            }
        }
        // Show overlay when info is being shown.
    });
    $("#item-info").on('show', function(){
        overlay.style.display = 'block';
        //console.log($("#character span"));
    });
    $("#item-info").on('hide', function(){
        overlay.style.display = 'none';
    });
})();