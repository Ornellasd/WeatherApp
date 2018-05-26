var ajax = function(keyword) {
  $.ajax({
    type: "GET",
    url: keyword,
    dataType: "jsonp",
    success: function(data) {
      console.log(data);
      showWeather(data);
    },
    error: function() {
      console.log("ERROR");
    }
  });
}

function showWeather(callback) {
  var temp = Math.round(callback.main.temp);
  var fahrenheit = temp * 9 / 5 + 32 + "F";
  var humidity = callback.main.humidity;
  var icon = callback.weather[0].icon;
  var location = callback.name;
  var condition = callback.weather[0].description.split(" ");

  $("#temperature").text("Temperature:" + " " + fahrenheit);
  $("#humidity").text("Humidty:" + " " + humidity + "%");
  $("#icon-image").attr("src", icon);
  $("#location").text(location);
  for (var i = 0; i < condition.length; i++) {
    var conditionFormat = condition[i][0].toUpperCase() + condition[i].slice(1, condition[i].length);
    $("#condition").text(conditionFormat);
  }

  $("#celsius").click(function() {
    $("#temperature").text("Temperature:" + " " + temp + "C");
  });
  $("#fahrenheit").click(function() {
    $("#temperature").text("Temperature:" + " " + fahrenheit);
  })
}

$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = "lat=" + Math.round(position.coords.latitude * 100) / 100;
      var lon = "lon=" + Math.round(position.coords.longitude * 100) / 100;
      var keyword = "https://fcc-weather-api.glitch.me/api/current?" + lat + "&" + lon;
      ajax(keyword);
      setInterval(ajax, 180000, keyword);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});
