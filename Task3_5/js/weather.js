'use strict'

function goodFormatDate(needDate, format) {
  const date = new Date(needDate * 1000);
  const yearOld = date.getFullYear();
  const yearNew = yearOld
    .toString()
    .slice(-2);
  const month = ['Jan', 'Feb', "Mar", "Apr", "May", 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthNow = month[date.getMonth()];
  const daysOld = date.getDate();
  const daysNew = daysOld < 10 ? ('0' + daysOld) : daysOld;
  const days = ['Sun', 'Mon', 'Tue', 'Wedy', 'Thu', 'Fri', 'Sat'];
  const daysNow = days[date.getDay()];
  const hourse = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours();
  const min = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes();
  const dateToday = new Date();
  const dayToday = dateToday.getDate();
  if (format == 'currentWeather') {
    return (`${hourse}:${min} &nbsp; ${daysNew} ${month[date.getMonth()]} ${yearNew}`);
  };

  if (format == 'sunUpDown' || format == 'forecastTime') {
    return (`${hourse}:${min}`);
  };

  if (format == 'forecastDate') {
    let formatForForecast = (`${daysNow} ${monthNow} ${daysNew} ${yearOld}`)
    if (daysOld == dayToday) {
      return (formatForForecast + '&nbsp; Today');
    };
    return formatForForecast;
  }

  if (format == 'forecastDateFor') return `${daysOld}`;
};

//Beaufort scale
function forceWind(y) {
  const x = y.toFixed(1)
  if (x <= .2) return "Calm";
  if (x >= .3 & x <= 1.5) return "Light Air";
  if (x >= 1.6 & x <= 3.3) return "Light Breeze";
  if (x >= 3.4 & x <= 5.4) return "Gentle Breeze";
  if (x >= 5.5 & x <= 7.9) return "Moderate Breeze";
  if (x >= 8 & x <= 10.7) return "Fresh Breeze";
  if (x >= 10.8 & x <= 13.8) return "Strong Breeze";
  if (x >= 13.9 & x <= 17.1) return "Near Gale";
  if (x >= 17.2 & x <= 20.7) return "Gale";
  if (x >= 20.8 & x <= 24.4) return "Strong Gale";
  if (x >= 24.5 & x <= 28.4) return "Storm";
  if (x >= 28.5 & x <= 32.6) return "Violent Storm";
  if (x >= 32.7) return "Hurricane";
};

function directionWind(x) {
  if (x == 360 || x == 0) return "North";
  if (x > 0 & x < 90) return "North East";
  if (x == 90) return "East";
  if (x > 90 & x < 180) return "South East";
  if (x == 180) return "South";
  if (x > 180 & x < 270) return "South West";
  if (x == 270) return "West";
  if (x > 270 & x < 360) return "North West";
};

function nameSity(lat, lon) {
  if (lat == 59.8944 && lon == 30.2642) return "Saint Petersburg, RU";
};

function addDays(numerDays) {
  Date.prototype.addDays = function(days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }
  const date = new Date();
  const counterDate = date.addDays(numerDays);
  const couterGetDays = counterDate.getDate();
  return `${couterGetDays}`;
};

function renderCurrentWeather(data, dataCarrent) {
  const currentWeatherBody = document.createElement('div');
  currentWeatherBody.classList.add(`currentWeather__Body`);
  currentWeatherBody.innerHTML = `
    <div class="currentWeather__iconAndTemp">
        <div class="currentWeather__icon"><img src="http://openweathermap.org/img/wn/${dataCarrent.weather[0].icon}@2x.png" alt="icon"></div>
        <div class="currentWeather__temp">${Math.round(dataCarrent.temp)} &#176;C</div>
    </div>
    <div class="currentWeather__atmosphere">${dataCarrent.weather[0].main}</div>
    <div class="currentWeather__date">${goodFormatDate(dataCarrent.dt, 'currentWeather')}</div>
    <table class="currentWeather__tabl">
        <tr>
            <td>&nbsp; Wind</td>
            <td class="currentWeather__wind">${forceWind(dataCarrent.wind_speed)}, ${dataCarrent.wind_speed.toFixed(1)} m/s, <br> ${directionWind(dataCarrent.wind_deg)} ( ${dataCarrent.wind_deg} )</td>
        </tr>
        <tr>
            <td>&nbsp; Cloudiness</td>
            <td class="currentWeather__cloudiness">${dataCarrent.weather[0].description}</td>
        </tr>
        <tr>
            <td>&nbsp; Pressure</td>
            <td class="currentWeather__pressure">${dataCarrent.pressure} hpa</td>
        </tr>
        <tr>
            <td>&nbsp; Humidity</td>
            <td class="currentWeather__humidity">${dataCarrent.humidity} %</td>
        </tr>
        <tr>
            <td>&nbsp; Sunrise</td>
            <td class="currentWeather__sunrise">${goodFormatDate(dataCarrent.sunrise, 'sunUpDown')}</td>
        </tr>
        <tr>
            <td>&nbsp; Sunset</td>
            <td class="currentWeather__sunset">${goodFormatDate(dataCarrent.sunset, 'sunUpDown')}</td>
        </tr>
        <tr>
            <td>&nbsp; Geo <br>&nbsp; coords</td>
            <td class="currentWeather__coords">[${data.lon.toFixed(2)}, ${data.lat.toFixed(2)}]</td>
        </tr>
    </table>
    `;
  document.querySelector('.currentWeather__header').after(currentWeatherBody);
};

function renderForecastWeatherDaily(forecastDaily, forecastHourly) {
  for (let i = 0; i < 5; ++i) {
    document.querySelector(`.forecastWeatherDateDay__day${i}`).innerHTML = `<p class="forecastWeatherHeaderDaily">&nbsp; ${goodFormatDate(forecastDaily[i].dt, 'forecastDate')}</p>`;
    for (let keyHourly in forecastHourly) {
      if (addDays(i) == goodFormatDate(forecastHourly[keyHourly].dt, 'forecastDateFor')) {
        document.querySelector(`.forecastWeatherDateDay__day${i}`).appendChild(renderForecastWeatherHourly(keyHourly, forecastHourly));
      };
    };
  };
};

function renderForecastWeatherHourly(index, y) {
  let forecastWeatherBodyHourly = document.createElement('div');
  forecastWeatherBodyHourly.classList.add(`forecastWeatherBodyHourly`);
  forecastWeatherBodyHourly.innerHTML += `
                <div class="forecastWeatherBodyHourly__left">
                <div class="forecastWeatherBodyHourly__left_time">${goodFormatDate(y[index].dt, 'forecastTime')}</div>
                    <img src="http://openweathermap.org/img/wn/${y[index].weather[0].icon}.png" alt="iconWeather"></div>
                <div class="forecastWeatherBodyHourly__right">
                    <span class="forecastWeatherBodyHourly__rightTemp">${y[index].temp.toFixed(1)} &#176;C</span> &nbsp; &nbsp;<em>${y[index].weather[0].description}</em><br>
                    ${y[index].wind_speed} m/s clouds:${y[index].clouds}%, ${y[index].pressure.toFixed(2)} hpa</div>                      
                `;
  return forecastWeatherBodyHourly;
};

function renderSityName(x) {
  document.querySelector('.currentWeather__header').innerHTML = `<h3>Weather in ${x}</h3>`
  document.querySelector('.forecastWeather__header').innerHTML = `Hourly weather and forecasts in ${x}`
};

function forecastWeather(y) {
  let forecastDaily = y.daily;
  let forecastHourly = y.hourly.filter(function(_, i) {
    return i % 3 === 0;
  });
  renderForecastWeatherDaily(forecastDaily, forecastHourly);
};

function renderGetNameSity(...place) {
  document.querySelector('.nameSity__header').textContent = 'choose the nearest place';
  for (let key of place) {
    let option = document.createElement('option');
    option.innerHTML += `<option value="${key}"> ${key} </option> `;
    document.getElementById("nameSity__select").appendChild(option);
  };
};

function changeSity() {
  let select = document.getElementById("nameSity__select");
  let sityName = select.options[select.selectedIndex].value;

  choseSity(sityName);
  sessionStorage.setItem('choseSityName', JSON.stringify(sityName));
};

navigator.geolocation.getCurrentPosition(getCurrentCoords);

function getCurrentCoords(pos) {
  let { latitude, longitude } = pos.coords;
  sessionStorage.setItem('coordsLat', JSON.stringify(latitude));
  sessionStorage.setItem('coordsLon', JSON.stringify(longitude));
  console.log(latitude);
  console.log(longitude);
  const httpSityName = new XMLHttpRequest();
  httpSityName.open('get', `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=ecbaa67ba7bece31be9e96bd8181180a`)
  httpSityName.send();
  httpSityName.addEventListener('load', function() {
    if (httpSityName.status == 200) {
      const data = JSON.parse(httpSityName.response);
      let sityName = data[0].name;
      sessionStorage.setItem('choseSityName', JSON.stringify(sityName));
      renderGetNameSity(data[0].name, data[1].name, data[2].name, data[3].name, data[4].name);
    } else {
      document.querySelector('.currentWeather__header').innerHTML = `sorry city name is not available`
    };
  });
};

function choseSity(sityNameNow) {
  const httpChoseSity = new XMLHttpRequest();
  httpChoseSity.open('get', `http://api.openweathermap.org/data/2.5/weather?q=${sityNameNow}&appid=ecbaa67ba7bece31be9e96bd8181180a`)
  httpChoseSity.send();
  httpChoseSity.addEventListener('load', function() {
    if (httpChoseSity.status == 200) {
      let data = JSON.parse(httpChoseSity.response);
      let latitude = data.coord.lat,
        longitude = data.coord.lon;
      sessionStorage.setItem('coordsLat', JSON.stringify(latitude));
      sessionStorage.setItem('coordsLon', JSON.stringify(longitude));
    } else {
      document.querySelector('.mainWeather').innerHTML = `sorry chose sity is not available`;
    };
  });
};

document.getElementById('submitButton').addEventListener("click", httpForecastWeather);

function httpForecastWeather() {
  document.getElementById('nameSity__form').style.display = "none";
  let httpforecastWeather = new XMLHttpRequest();

  let lat = JSON.parse(sessionStorage.getItem('coordsLat'));
  let lon = JSON.parse(sessionStorage.getItem('coordsLon'));

  httpforecastWeather.open('get', `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=ecbaa67ba7bece31be9e96bd8181180a`)
  httpforecastWeather.send();
  httpforecastWeather.addEventListener('load', function() {
    if (httpforecastWeather.status == 200) {
      let data = JSON.parse(httpforecastWeather.response);
      let nowSityName = JSON.parse(sessionStorage.getItem('choseSityName'));
      renderSityName(nowSityName);
      renderCurrentWeather(data, data.current);
      forecastWeather(data);

      document.querySelector(".currentWeather_wrap").style.padding = "5px";
      document.querySelector(".forecastWeather_wrap").style.padding = "5px";
    } else {
      document.querySelector('.mainWeather').innerHTML = `sorry weather is not available`
    };
  });
};