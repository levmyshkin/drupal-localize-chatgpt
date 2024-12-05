// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-11-02
// @description  try to take over the world!
// @author       You
// @match        https://localize.drupal.org/translate/languages/sr/translate?page=9&project=drupal&status=5&release=570110&search=&author=&context=all&limit=10&sid=0
// @icon         https://www.google.com/s2/favicons?sz=64&domain=drupal.org
// @grant        none
// ==/UserScript==

(function($) {
    'use strict';

    // Your code here...
    $(document).ready(function() {
        $('.actions').remove();
        $('.l10n-usage').remove();
        $('.source code').unwrap();
        $('.string-context').remove();

        // Remove extra <code> tags from source string to avoid extra spaces.
        setTimeout(function() {
           $('.l10n-string.filter-no-match').each(function() {
               const textWithoutCodeTags = $(this).html().replace(/<\/?code>/g, '');
               $(this).html(textWithoutCodeTags);
           });

           $('.l10n-placeholder').each(function () {
               $(this).replaceWith($(this).html());
           });
        }, 1500);



      // Flag to track if the form has been modified
        let formModified = false;

        // Get the form and input elements
        const form = document.getElementById('l10n-community-translate-form');

        // Listen for changes in the form
        form.addEventListener('change', () => {
            formModified = true;
        });

        // Listen for the form submit event
        form.addEventListener('submit', () => {
            formModified = false; // Reset flag on form submission
        });

        // Listen for the beforeunload event to show a warning when the user tries to leave the page
        window.addEventListener('beforeunload', function (e) {
            if (formModified) {
                // Standard message for some browsers
                const message = 'You have unsaved changes. Are you sure you want to leave?';

                // For some browsers, the returnValue property is used
                e.returnValue = message;

                // For others, we set a custom message (note: custom messages are not shown in modern browsers)
                return message;
            }
        });

    });


     // Removes all trailing whitespace and line breaks.
    // Select all textareas
    const textareas = document.querySelectorAll('textarea');

    // Function to trim trailing whitespace and line breaks
    function cleanTextArea(event) {
        this.value = this.value.replace(/\s+$/g, ''); // Removes all trailing whitespace and line breaks
    }

    // Add event listeners to all textareas
    textareas.forEach((textarea) => {
        textarea.addEventListener('paste', function (event) {
            // Allow paste to complete, then clean the text
            setTimeout(() => cleanTextArea.call(this), 0);
        });
    });




})(jQuery);