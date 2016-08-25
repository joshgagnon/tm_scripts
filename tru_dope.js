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
        var str = document.body.innerHTML, hit=false;
        replacements.map(function(pair){
            if(str.search(pair[0]) >= 0){
                hit = true;
                str = str.replace(pair[0], pair[1]);
            }
        });
        if(hit){
            document.body.innerHTML = str;
        }
    }

    var limitedReplace = debounce(replace, 500, true);

    var observer = new MutationObserver(function(){ limitedReplace(); });
    observer.observe(document.body,  {  childList: true, subtree: true });
    replace();
    // Your code here...
})();