/**
 *
 * composer-char-counter.js - reponsisble for the reactive character counter displayed under the tweeter submission form.
 *
 */


$(document).ready(function() {

  //const characterCount = document.getElementById("character-count-input");
  
  // Decrement tweeter count for each character that is typed.
  $("#character-count-input").on("keydown", function() {

    const characterCount = $("#character-count-input").val();
    console.log(characterCount);

    // let characterCount = 140 - this.value.length + 1;

    // $("#character-counter").html(characterCount);

    // if (characterCount < 0) {
    //   $("#character-counter").addClass("counter");
    // } else {
    //   $("#character-counter").removeClass("counter");
    // }

  });

});
