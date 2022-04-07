var lat, lon;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(mostrarUbicacion);
} else {
    window.confirm("Lo sentimos no pudimos acceder a su ubicación");
}

function mostrarUbicacion(ubicacion) {
    lat = ubicacion.coords.latitude;
    lon = ubicacion.coords.longitude;
}

$(function () {
    document.getElementById("tblw").addEventListener("click", () => {
        $.ajax({
            type: "GET",
            url: `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=97ac6f8688d0deba314ff7895984cd6c`,
            dataType: "json",
            success: function (data) {
                $(".lugar").html(data.name);
                $(".temperatura").html(data.main.temp - 273.15 + "°");
                $(".icono").html(`<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">`);
                $(".humedad").html(data.main.humidity);
                $(".viento").html(data.wind.speed);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    });
});
