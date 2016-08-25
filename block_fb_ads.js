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
    function clearAds() {
        [].slice.call(document.querySelectorAll('.userContentWrapper>div>div'))
            .filter(function(el){return el.textContent==='Suggested Post';})
            .map(function(el){return el.parentNode.parentNode.parentNode.style.display="none";});

    }
    var target = document.querySelector('#stream_pagelet>div:last-child');
    var observer = new MutationObserver(function(){clearAds();});
    observer.observe(target,  {  childList: true, subtree: true });
})();