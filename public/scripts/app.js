
$(document).ready(function(){

loadTweets()

/////////////////// Helper functions //////////////////

function timeSince(date) {
  var _MS_PER_DAY = 1000 * 60 * 60 * 24;
  date = new Date(date) // converts inputed date to "js date"
  let today = new Date()

  // Discard the time and time-zone information.
  var utc1 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  var utc2 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  let diff = (utc2 - utc1) / _MS_PER_DAY
  if(diff < 0) {
    diff = diff * -1
  }
  return Math.floor(diff);
}

// provides a conversion to escapeable html char.
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

/////////////////// AJAX + Styling functions //////////////////


// Toggles the compose button
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
          loadNewTweets()
        }
    });
  } else {
     $.growl.error({ message: "Tweet is over 140 Characters ", location: 'tc' });
  }
});




// uses AJAX to all of the tweets
function loadTweets() {
   $.ajax({
      type:'GET',
      url:'/tweets/',
      success: function(database) {
        renderTweets(database)
      }
  });
}

// Loads just the lastest tweet
function loadNewTweets() {
   $.ajax({
      type:'GET',
      url:'/tweets/',
      success: function(database) {
        renderTweets([database[database.length - 1]])
      }
  });
}

function renderTweets(tweetArray) {
  for(var tweet = 0; tweet < tweetArray.length; tweet++) {
    createTweetElement(tweetArray[tweet]);
  }
}

// Creates the HTML for each new element
function createTweetElement(tweet) {
  let name = escapeHtml(tweet.user.name )
  let handle = escapeHtml(tweet.user.handle)
  let avatar =   tweet.user.avatars.small
  let content =  escapeHtml(tweet.content.text)
  let age = timeSince (tweet.created_at)


  let newTweetHTML = `
    <article class="existing-tweets opaque">
      <header>
            <img src="${avatar}" />
            <h2 class="name">${name}</h2>
            <p class="handle">${handle} </p>
        </header>
        <p class="tweetBody">${content}</p>
        <footer>
           <p class="relativeDate"> ${age} days ago </p>
           <div  class="tweetIcons invisible">
            <i class="fa fa-heart tweet-action" aria-hidden="true"></i>
            <i class="fa fa-retweet tweet-action" aria-hidden="true"></i>
            <i class="fa fa-flag tweet-action" aria-hidden="true"></i>
         </div>
        </footer>
      </article>
      </br>
      </br>`

  $("#tweets-container").prepend(newTweetHTML);


// Function which adds hover
function opacityHover(container, object){
  $(container).on('mouseenter', object, function() {
    event.preventDefault();
    $(this).find(".tweetIcons").removeClass("invisible")
    $(this).removeClass("opaque");
  })

  $(container).on('mouseleave', object ,function() {
    event.preventDefault();
    $(this).find(".tweetIcons").addClass("invisible")
    $(this).addClass("opaque");
  })
}

/////////////////// Function Calls  //////////////////

opacityHover("#tweets-container",".existing-tweets")
opacityHover("#nav-bar","#compose")

  }
})

