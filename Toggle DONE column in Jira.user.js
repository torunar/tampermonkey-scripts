// ==UserScript==
// @name         Toggle DONE column in Jira
// @namespace    https://torunar.github.io
// @version      2024-11-04
// @description  Adds a button that shows or hides the last column on agile boards
// @author       torunar
// @match        https://*.atlassian.net/jira/software/c/projects/*/boards/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=atlassian.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const TITLE_HIDDEN = 'Show DONE';
    const TITLE_VISIBLE = 'Hide DONE';

    const pinger = setInterval(
        () => {
            const toolbar = document.querySelector('[data-testid="software-board.header.controls-bar"]');
            if (toolbar === null) {
                return;
            }

            clearInterval(pinger);

            let isVisible = true;

            const toggler = document.createElement('button');
            toggler.innerText = TITLE_VISIBLE;

            toggler.style.fontSize = '14px';
            toggler.style.fontWeight = 500;
            toggler.style.padding = '7px';
            toggler.style.border = 0;
            toggler.style.borderRadius = '3px';

            toggler.onclick = () => {
                isVisible = !isVisible;
                toggler.innerText = isVisible
                    ? TITLE_VISIBLE
                    : TITLE_HIDDEN;

                const doneColumn = document.querySelector('[data-testid="platform-board-kit.ui.column.draggable-column.styled-wrapper"]:last-of-type');
                doneColumn.style.display = isVisible
                    ? 'flex'
                    : 'none';
            };

            toolbar.appendChild(toggler);
        },
        500
    );
})();