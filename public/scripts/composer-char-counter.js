/* <section class="new-tweet">
      <h2>Compose Tweet</h2>
      <form  action="/tweets" method="POST">
        <textarea name="text" placeholder="What are you humming about?"></textarea>
        <input type="submit" value="Tweet">
        <span class="counter">140</span>
      </form>
</section>*/

$( document ).ready(function() {

$(".new-tweet textarea").on("keyup", function() {
  let length = $(".new-tweet textarea").val().length
  let counter = $(this).parent().find(".counter")
  counter.text(length)

  if(length > 140){
    counter.addClass('overlimit');
  } else {
    counter.removeClass('overlimit');
  }

});



});