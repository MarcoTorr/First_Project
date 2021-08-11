var flightTabUrl = "./flight.html";
//var error= "./404.html";
var ButtonFlight = document.querySelector("#button-flights");
var loginEl = document.querySelector("#sign-in");
var loginForm = document.querySelector("#log-in");

/*
function redirectFlight (event){
    fetch(flightTabUrl).then(function(response){

        if (response.status === 404){
            window.location.replace(error);
        } else {
            window.location.replace(flightTabUrl)
        }
    })
}
*/

ButtonFlight.addEventListener("click",function(){
    window.location.replace(flightTabUrl)
})
console.log(loginForm.style.display);

loginEl.addEventListener("click",function(){
    if (loginForm.style.display==="none"){
        loginForm.style.display="";
    }
    else if (loginForm.style.display===""){
        loginForm.style.display="none";
    } 
})


var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}