/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

// Handle tweet from submission

$( "#tweet-form" ).submit(function( event ) {
  event.preventDefault();
  console.log("The form has been submitted!");

  const tweetData = $(this).serialize();

  $.post( "tweets", tweetData, function(data, status) {
    console.log("Data: ", data, "\nStatus: ", status);
  });
});

/**
 * 
 * loadTweets - requests all tweets from /tweets and passes them to the renderTweets function.
 * 
 */
const loadTweets = () => {
  $.get('/tweets')
    .then(function(response) {
      console.log(response);
      renderTweets(response);
    })
};

loadTweets();


const createTweetElement = (tweetObj) => {

  //const tweetDuration = Date.now() - tweetData.createdAt;

  const $tweetHtml = $(`
  <article class="article-tweet">
    <header>
      <div class="user-name-avatar">
        <img src="${tweetObj.user.avatars}" alt="User's tweeter profile picture" width="70">
        <p>${tweetObj.user.name}</p>
      </div>
      <h3 class="user-handle">${tweetObj.user.handle}</h3>
    </header>
      <p>${tweetObj.content.text}</p>
    <footer>
      <time>${tweetObj.created_at}</time>
      <section class="icons-section">
      <i class="fa-sharp fa-solid fa-flag fa-lg icon"></i>
      <i class="fa-sharp fa-solid fa-retweet fa-lg icon"></i>
      <i class="fa-sharp fa-solid fa-heart fa-lg icon"></i>
      </section>
    </footer>
  </article>`);

  return $tweetHtml;
}

const renderTweets = (tweetArray) => {
  for (const tweet of tweetArray) {
    let $tweet = createTweetElement(tweet);
    $('#main-container').append($tweet);
  }
}

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]



//const $tweet = createTweetElement(tweetData);
//console.log($tweet);

//renderTweets(data);

});
