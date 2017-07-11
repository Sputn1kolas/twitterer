$(document).ready(function(){

$("form").on('submit', function(event) {
  console.log("I got called")
  event.preventDefault();

  $.ajax({
      type:'POST',
      url:'/tweets',
      data : $("textarea").serialize(),
      success: function() {
        console.log("By George.. it worked!")
      }
  });
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


 let db  = [{
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}]

function renderTweets(db) {
  for(var tweet = 0; tweet < db.length; tweet++) {
    createTweetElement(db[tweet]);
  }
}


function createTweetElement(db) {
  let name = escapeHtml(db.user.name )
  let handle = escapeHtml(db.user.handle)
  let avatar =   db.user.avatars.small
  let content =  escapeHtml(db.content.text)
  let age = timeSince (db.created_at)


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

renderTweets(db)


})

