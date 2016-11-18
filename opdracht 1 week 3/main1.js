/* use this to test out your function */
window.onload = function() {
 	 changeColor("ita", "#cc33ff");
   changeColor("gb", "#00ff00");
   changeColor("swe", "#ff33cc");
   changeColor("esp", "#996633")


}

/* changeColor takes a path ID and a color (hex value)
   and changes that path's fill color */
function changeColor(id, color) {

        var x = document.getElementById(id).style.fill = color;

}
