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