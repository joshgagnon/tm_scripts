// ==UserScript==
// @name         Block FB Ads es5
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.facebook.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var textMatchStrings = ['Suggested Post', 'Suggested Game'];

    function textMatch(el){
        return textMatchStrings.some(function(str){ return el.textContent === str; });
    }

    function ancestor(el, gen){
        while(gen-- > 0){
            el = el.parentNode;
        }
        return el;
    }

    function clearAds() {
        [].slice.call(document.querySelectorAll('.userContentWrapper>div>div'))
            .filter(function(el){return textMatch(el); })
            .map(function(el){el.parentNode.parentNode.parentNode.style.display="none";});

        [].slice.call(document.querySelectorAll('.uiStreamSponsoredLink'))
          .map(function(el){
              ancestor(el, 10).style.display="none";
        });

    }
    var target = document.querySelector('#stream_pagelet>div:last-child');
    var observer = new MutationObserver(function(){clearAds();});
    observer.observe(target,  {  childList: true, subtree: true });
})();