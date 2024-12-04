// ==UserScript==
// @name         Block huita on HackerNews
// @namespace    https://torunar.github.io
// @version      2024-06-10
// @description  Fuck AI and daddy Musk news
// @author       torunar
// @match        https://news.ycombinator.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ycombinator.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const trashBlocked = [];
    const caseSensitiveList = /(AI|\.ai|RAG)/;
    const caseInsensitiveList = /(llm|gpt|musk|web3|crypto|bitcon|ethereum|trump|harris|claude)/i;

    document.querySelectorAll('.titleline').forEach((title) => {
        if (
            caseSensitiveList.test(title.innerText)
            || caseInsensitiveList.test(title.innerText)
        ) {
            trashBlocked.push(title.innerText);

            const row = title.closest('tr');
            row.nextElementSibling.nextElementSibling.outerHTML = ''; // spacer
            row.nextElementSibling.outerHTML = ''; // stats
            row.outerHTML = '';
        }
    });

    if (trashBlocked.length !== 0) {
        console.log("Trash blocked:" + trashBlocked.map((line) => `\n* ${line}`));
        document.querySelector('.yclinks').innerHTML += ` | Blocked ${trashBlocked.length} huita`;
    }
})();