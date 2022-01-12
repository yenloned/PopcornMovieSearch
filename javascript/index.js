window.onload = function() {home()};
window.onscroll = function() {stickybar()};

var navigationBar = document.getElementById("navigationBar");
var sticky = navigationBar.offsetTop;

function stickybar() {
    if (window.pageYOffset >= sticky) {
        navigationBar.classList.add("sticky")
    } else {
        navigationBar.classList.remove("sticky");
    } 
}




  

    function home() {

        var x = document.getElementById("search_index");
        if (x.style.display === "none") {
            x.style.display = "block";
          } else {
            x.style.display = "none";
          }
        var x = document.getElementById("index");
        if (x.style.display === "none") {
            x.style.display = "block";
          }
        }
    

    function reflesh(){
        location.replace("index.html")
    }







