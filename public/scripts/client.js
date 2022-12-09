/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

/**
 * 
 * renderError - animates an html error on the page based on the error code recieved from the Jquery submit.
 * @param {Number} errorCode - 0 equals null input, 1 is > 140 characters
 * 
 */
const renderError = (errorCode) => {
  if (errorCode === 0) {
    $('.tweet-error-message').css("display", "none");
    $('.tweet-error-message').html("Sorry, your tweet didn't contain any information. Please try again!");
    $('.tweet-error-message').slideDown(1000).css('display', 'flex');
  } else if (errorCode === 1) {
    $('.tweet-error-message').css("display", "none");
    $('.tweet-error-message').slideDown(1000).css('display', 'flex');
    $('.tweet-error-message').html("Sorry, your tweet was too long. Please keep tweets under 140 characters.");
  }
};

/**
 * 
 * Handle tweet form submission.
 * 
 */

$( "#tweet-form" ).submit(function( event ) {
  event.preventDefault();

  const tweetData = $(this).serialize();
  const inputLength = $("#character-count-input").val().length;

  // Validate that the form input is neither empty or too long before submitting and render the appropriate error response.
  if (inputLength === 0) {
    return renderError(0);
  } else if (inputLength > 140) {
    return renderError(1);
  }else {
    $('.tweet-error-message').slideUp(1000);
    $.post( "tweets", tweetData, function(data, status) {
      console.log("The form has been submitted!");
      console.log("Data: ", data, "\nStatus: ", status);
      // Clear the input feild
      $('#character-count-input').val("");
      // Reload newest tweets
      loadTweets();
      
    });
  }
  
});

/**
 * 
 * Tweet Form sshow/hide animation
 * 
 */

 $("#write-new-tweet-container").click(function(){
  $("#tweet-form").slideToggle(500);
  $( "#character-count-input" ).focus();
});

/**
 * 
 * loadTweets - requests all tweets from /tweets and passes them to the renderTweets function.
 * 
 */

const loadTweets = () => {
  $.get('/tweets')
    .then(function(response) {
      renderTweets(response);
    })
    .catch(err => {
      console.log("Error: ", err);
    })
};

loadTweets();

/**
 * 
 * createTweetElement - returns an html string for each tweet that is passed the function.
 * @params {array} tweetObj - a tweet in the form of an object.
 * 
 */

const createTweetElement = (tweetObj) => {

  const $tweetHtml = $(`
  <article class="article-tweet">
    <header>
      <div class="user-name-avatar">
        <img src="${tweetObj.user.avatars}" alt="User's tweeter profile picture" width="70">
        <p>${tweetObj.user.name}</p>
      </div>
      <h3 class="user-handle">${tweetObj.user.handle}</h3>
    </header>
      <p>${escape(tweetObj.content.text)}</p>
    <footer>
      <time id="timeAgo">${timeago.format(tweetObj.created_at)}</time>
      <section class="icons-section">
      <i class="fa-sharp fa-solid fa-flag fa-lg icon"></i>
      <i class="fa-sharp fa-solid fa-retweet fa-lg icon"></i>
      <i class="fa-sharp fa-solid fa-heart fa-lg icon"></i>
      </section>
    </footer>
  </article>`);

  return $tweetHtml;
}

/**
 * 
 * escape - encodes user input to avoid XSS vulnrabilities. 
 * @param {string} content - the user's input. 
 * 
 */

const escape = function (content) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(content));
  return div.innerHTML;
};

/**
 * 
 * renderTweets - calls the createTweetElement for each tweet in our database and appends it to the DOM.
 * @params {array} tweetObj - and array of tweet objects.
 * 
 */

const renderTweets = (tweetArray) => {
  for (const tweet of tweetArray) {
    let $tweet = createTweetElement(tweet);
    $('#tweet-container').prepend($tweet);

  }
}

});
