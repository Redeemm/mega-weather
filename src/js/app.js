const form = document.querySelector("form");

const dateConvertor = () => {
  const weekday = new Date().getDay();
  const dayNo = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

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

  document.querySelector(".city__date--value").innerHTML = date;
};

dateConvertor();

form.addEventListener("submit", (e) => {
  //preventing default loading
  e.preventDefault();

  //creating a new class object instance
  const forecaster = new forecast(e.target.firstElementChild.value);
  //   console.log(Array(e.target));

  //making the API fetch request
  forecaster.fetchWeather();

  //cleaning the input of the form
  e.target.reset();
});

const storage = () => {
  const city = localStorage.getItem("city");
  city ? new forecast(city).fetchWeather() : "";
  console.log("storage run");
};

storage();
