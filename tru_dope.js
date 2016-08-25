// ==UserScript==
// @name         Tru-dope
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };
    
    var replacements = [[new RegExp('Trudeau', "g"), 'Tru-dope']];
    
    function replace() {
        var start = document.body.innerHTML;
        replacements.map(function(pair){
            start = start.replace(pair[0], pair[1]);
        });
        document.body.innerHTML = start;
    }
    
    var limitedReplace = debounce(replace, 500, true);

    var observer = new MutationObserver(function(){ limitedReplace(); });
    observer.observe(document.body,  {  childList: true, subtree: true });
    replace();
    // Your code here...
})();