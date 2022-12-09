/**
 *
 * composer-char-counter.js - reponsisble for the reactive character counter displayed under the tweeter submission form.
 *
 */

$(document).ready(function() {
  
  // Decrement tweet character count for each character that is typed.
  $("#character-count-input").keyup(function() {

    let charactersRemaining = 140 - $(this).val().length;
    const characterCounterElement = $(this).siblings("div").children("output");

    // Update counter
    characterCounterElement.html(charactersRemaining);

    // Style negative numbers
    if (charactersRemaining < 0) {
      characterCounterElement.addClass("negative-number");
    } else {
      characterCounterElement.removeClass("negative-number");
    }
  });

});
