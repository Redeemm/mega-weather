//importing date functions
const form = document.querySelector("form");

const dateConvertor = (newNow = new Date()) => {
  const weekday = newNow.getDay();
  const dayNo = newNow.getDate();
  const month = newNow.getMonth();
  const year = newNow.getFullYear();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const date = `${day[weekday]}, ${dayNo} ${months[month]}, ${year}`;

  return date;
};

document.querySelector(".city__date--value").innerHTML = dateConvertor();

form.addEventListener("submit", (e) => {
  //preventing default loading
  e.preventDefault();

  //creating a new class object instance
  const forecaster = new forecast(e.target.lastElementChild.value);

  //making the API fetch request
  forecaster.fetchWeather();

  //cleaning the input of the form
  e.target.reset();
});

const storage = () => {
  const city = localStorage.getItem("city");
  city ? new forecast(city).fetchWeather() : "";
};

storage();
