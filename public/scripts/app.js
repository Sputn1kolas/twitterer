// to do: add hover class,  correct dates, only add latest tweet.. not everyone again!

$(document).ready(function(){

loadTweets()

// toggles the compose button
$("#compose").on('click', function() {
  $("#compose").toggleClass("highlighted");
 if($(this).hasClass("highlighted")) {
    $(".new-tweet").slideUp()
  } else {
    $(".new-tweet").slideDown()
    $("#newTextArea").focus()
  }
})


// Uses AJAX to send the tweet
$("form").on('submit', function(event) {
  event.preventDefault();
  let string = $("textarea").serialize()
  let stringRaw = $("textarea").val()
  if(stringRaw.length <= 140 && string) {
    $.ajax({
        type:'POST',
        url:'/tweets',
        data : string,
        success: function() {
          loadTweets()
        }
    });
  } else {
     $.growl.error({ message: "Tweet is over 140 Characters ", location: 'tc' });
  }
});



function timeSince(date) {
  date = new Date(Date.now() - date)
  var seconds = Math.floor((new Date() - date) / 1000);

  // Seconds are divided by years, months, days, hours, minutes...
  var interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}


// S.O. mustash.js https://stackoverflow.com/a/12034334
var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
}

function escapeHtml (string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  });
}


// uses AJAX to load the tweet
function loadTweets() {
   $.ajax({
      type:'GET',
      url:'/tweets/',
      success: function(database) {
        console.log(database)
        renderTweets(database)
      }
  });
}


function renderTweets(tweetArray) {
  for(var tweet = 0; tweet < tweetArray.length; tweet++) {
    createTweetElement(tweetArray[tweet]);
  }
}


function createTweetElement(tweet) {
  let name = escapeHtml(tweet.user.name )
  let handle = escapeHtml(tweet.user.handle)
  let avatar =   tweet.user.avatars.small
  let content =  escapeHtml(tweet.content.text)
  let age = timeSince (tweet.created_at)


  let newTweetHTML = `
  <article class="existing-tweets">
        <header>
            <img src="${avatar}" />
            <h2 class="name">${name}</h2>
            <p class="handle">${handle} </p>
        </header>
        <p class="tweetBody">${content}</p>
        <footer>
           <p class="relativeDate"> ${age} days ago </p>
           <div >
              <i class="fa fa-heart tweet-action" aria-hidden="true"></i>
              <i class="fa fa-retweet tweet-action" aria-hidden="true"></i>
              <i class="fa fa-flag tweet-action" aria-hidden="true"></i>
           </div>
        </footer>
      </article>"`

  $("#tweets-container").prepend(newTweetHTML);

  }
})

