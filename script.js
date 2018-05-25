$(document).ready(function() {

   if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
    var lat = "lat=" + Math.round(position.coords.latitude);
    var lon = "lon=" + Math.round(position.coords.longitude);
    var keyword = "https://fcc-weather-api.glitch.me/api/current?" + lat + "&" + lon;

    $.getJSON(keyword, function(json) {
        var temp = json.main.temp;
        var fahrenheit = temp * 9/5 + 32 + "F";
        var humidity = json.main.humidity;
        var icon = json.weather[0].icon;
        $("#temperature").text("Temperature:" + " " + fahrenheit);
        $("#humidity").text("Humidty:" + " " + humidity + "%");
        $("#icon-image").append("<img src='" + icon + "' />");
      });
    });
   } else {
    console.log("Geolocation is not supported by this browser.");
  }
});

