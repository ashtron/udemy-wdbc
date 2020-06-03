$("ul").on("click", "li", function() {
    $(this).toggleClass("completed");
});

$("ul").on("click", "span", function(e) {
  $(this).parent().fadeOut(500, function() {
    $("this").remove();
  });

  event.stopPropagation();
});

$("input[type='text']").keypress(function(e) {
  if (e.which === 13) {
    let todoText = $(this).val();
    $(this).val("");
    console.log(todoText);

    $("ul").append(`<li><span><i class='fa fa-trash'></i></span> ${todoText}</li>`);
  }
});

$(".fa-plus").click(function() {
  $("input[type='text']").fadeToggle();
});
