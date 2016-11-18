/*
Pim de Waard
5894778

data-processing
*/
window.onload = function() {

   changeColor()
}

/* changeColor takes a path ID and a color (hex value)
   and changes that path's fill color */
function changeColor() {


    // get data from textarea and split it line by line
    var text_area = document.getElementById("deathdata")
    var data = text_area.value.split("\n")

    // for loop that changes color of country by data from json
    for (i = 0; i < 248; i++){

      // parse data and store it in locale variable country and death
      var line = JSON.parse(data[i])
      var country = line.Countrycode.toLowerCase()
      var death =  parseFloat(line.Life_exp)

      // if id from textarea does not exist in svg from world then for loop is skipped to the next element
      if (!document.getElementById(country)) {
        continue;
      }

      // 0 stands for data not know, and country get color thats quite different from sequential color serie.
      else if (death==0){
      document.getElementById(country).style.fill = "#ff704d"}

      // gives color to country according with data from life expectancy
      else if (death>80.0){
      document.getElementById(country).style.fill = "#0c2c84"}
      else if (death>75.0){
      document.getElementById(country).style.fill = "#225ea8"}
      else if (death>70.0){
      document.getElementById(country).style.fill = "#1d91c0"}
      else if (death>65.0){
      document.getElementById(country).style.fill = "#41b6c4"}
      else if (death>60.0){
      document.getElementById(country).style.fill = "#7fcdbb"}
      else if (death>55.0){
      document.getElementById(country).style.fill = "#c7e9b4"}
      else if (death>50.0){
      document.getElementById(country).style.fill = "#edf8b1"}
      else if (death<50.0 && death > 0){
      document.getElementById(country).style.fill = "#ffffd9"}


    }
    document.getElementById("_somaliland").style.fill = "#ff704d"


}
