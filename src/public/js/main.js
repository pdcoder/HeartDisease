function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
function func(){
    $('.box').hide();
}

$('.card').click(function(){
    $(this).toggleClass('flipped');
  });

$(window).load(function () {
$('.loader').hide();
    

});
