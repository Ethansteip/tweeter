/**
 *
 * composer-char-counter.js - reponsisble for the reactive character counter displayed under the tweeter submission form.
 *
 */


// Questions:
// 1.) "This" points to my text area DOM node. How can I leverage "This" while also access the jQuery methods?
// 2.) 


$(document).ready(function() {

  //const characterCount = document.getElementById("character-count-input");
  
  // Decrement tweeter count for each character that is typed.
  $("#character-count-input").keyup(function() {

    let charactersRemaining = 140 - $(this).val().length;

    const characterCounterElement = $(this).siblings("div").children("output");

    characterCounterElement.html(charactersRemaining);

    if (charactersRemaining < 0) {
      characterCounterElement.addClass("negative-number");
    } else {
      characterCounterElement.removeClass("negative-number");
    }
  });

});
