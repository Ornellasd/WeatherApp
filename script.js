$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = "lat=" + Math.round(position.coords.latitude * 100) / 100;
      var lon = "lon=" + Math.round(position.coords.longitude* 100) / 100;
      var keyword = "https://fcc-weather-api.glitch.me/api/current?" + lat + "&" + lon;

      $.getJSON(keyword, function(json) {
        var temp = Math.round(json.main.temp);
        var fahrenheit = temp * 9 / 5 + 32 + "F";
        var humidity = json.main.humidity;
        var icon = json.weather[0].icon;
        var location = json.name;
        var condition = json.weather[0].description;

        $("#temperature").text("Temperature:" + " " + fahrenheit);
        $("#humidity").text("Humidty:" + " " + humidity + "%");
        $("#icon-image").append("<img src='" + icon + "' />");
        $("#location").text(location);
        $("#condition").text(condition);

        $("#celsius").click(function() {
          $("#temperature").text("Temperature:" + " " + temp + "C");
        });
        $("#fahrenheit").click(function() {
          $("#temperature").text("Temperature:" + " " + fahrenheit);
        })
      });

    });

  } else {
    console.log("Geolocation is not supported by this browser.");
  }
});
