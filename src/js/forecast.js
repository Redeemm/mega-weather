class forecast {
  constructor(city) {
    this.apiKey = `b6e05da418170c990fdeb60bd2d88f18`;
    this.city = city;
  }

  fetchWeather() {
    const sendRequest = async () => {
      const req = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}`
      );
      const data = req.json();
      return data;
    };

    sendRequest()
      .then((data) => {
        this.updateWeather(data);
        this.fetchDailyForecast(data.coord.lat, data.coord.lon);
      })
      .catch((err) => {
        // alert("No Internet Connection");
        console.log(err);
      });

    return this;
  }

  fetchDailyForecast(lat, lon) {
    const sendRequest = async () => {
      const req = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${this.apiKey}`
      );
      const data = req.json();
      return data;
    };

    sendRequest()
      .then((data) => {
        this.updateDailyForecast(data);
      })
      .catch((err) => {
        // alert("No internet Connect");
        console.log(err);
      });

    return this;
  }

  updateWeather(data) {
    const tempIcon = data.weather[0].icon;
    const tempDescription = data.weather[0].description;
    const temp = Math.round(data.main.temp - 273.15);
    const cityName = data.name.toUpperCase();
    const humidity = data.main.humidity;
    const wind = data.wind.speed;
    const pressure = data.main.pressure;

    //name of the city
    document.querySelector(".city__location--name").innerHTML = cityName;
    //temperature
    document.querySelector(".condition__temp--value").innerHTML = temp;
    document.querySelector(".condition__status--value").innerHTML =
      tempDescription;
    document
      .querySelector(".condition__status--icon")
      .setAttribute("src", `http://openweathermap.org/img/w/${tempIcon}.png`);
    document.querySelector(
      ".others__humidity--value"
    ).innerHTML = `${humidity}%`;
    document.querySelector(".others__wind--value").innerHTML = `${wind} MPG`;
    document.querySelector(
      ".others__pressure--value"
    ).innerHTML = `${pressure} Pa`;

    //storing the city name in local storage
    this.storeData(cityName);
  }

  updateDailyForecast(data) {
    const days = [];
    const daysIcon = [];
    const dayDate = [];

    document.querySelectorAll(".forecast__day--status").forEach((list) => {
      days.push(list);
    });

    document.querySelectorAll(".forecast__day--icon").forEach((list) => {
      daysIcon.push(list);
    });

    document.querySelectorAll(".forecast__day--date").forEach((list) => {
      dayDate.push(list);
    });

    const settingForecast = (index) => {
      days[index].innerHTML = data.daily[index].weather[0].description;
      daysIcon[index].setAttribute(
        "src",
        `http://openweathermap.org/img/w/${data.daily[index].weather[0].icon}.png`
      );

      const now = new Date();
      const day = now.getDate();
      const newDate = now.setDate(day + (index + 1));
      const newNow = new Date(newDate);

      dayDate[index].innerHTML = dateConvertor(newNow);
    };

    for (let i = 0; i < 5; i++) {
      settingForecast(i);
    }

    document.querySelector(".hide").style.display = "grid";
  }

  storeData(city) {
    localStorage.setItem("city", city);
  }
}
