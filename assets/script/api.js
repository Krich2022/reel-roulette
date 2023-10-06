$(function () {
  $("#get-movie").on("click", generateMovie);
  $("#try").on("click", tryAgain);
  $("#store").on("click", storeMovie);
});
let goodMovies = JSON.parse(localStorage.getItem("goodMovies"));
if (!goodMovies) {
  goodMovies = [];
}
let userServices = JSON.parse(localStorage.getItem("userServices"));
if (!userServices) {
  userServices = [];
}
userServices.forEach(function (serviceId) {
  $("#" + serviceId).prop("checked", true);
});
let movies = [];
let movieNumber = 0;
const genres = {
  adventure: 12,
  fantasy: 14,
  animation: 16,
  drama: 18,
  horror: 27,
  action: 28,
  comedy: 35,
  history: 36,
  western: 37,
  thriller: 53,
  crime: 80,
  documentary: 99,
  sciFi: 878,
  mystery: 9648,
  music: 10402,
  romance: 10749,
  family: 10751,
  war: 10752,
};

const services = {
  netflix: "netflix",
  prime: "prime.subscription",
  buyRent: "prime.rent,prime.buy,apple.rent,apple.buy",
  HBOmax: "hbo,hulu.addon.hbo,prime.addon.hbomaxus",
  hulu: "hulu.subscription,hulu.addon.hbo",
  apple: "apple.addon",
  peacock: "peacock.free",
};

function generateMovie(e) {
  e.preventDefault();

  usedMovies = [];
  movieNumber = 0;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "2ac69e0632mshb00a4ba8e266c71p159332jsn490d9476e71d",
      "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
    },
  };
  let url =
    "https://streaming-availability.p.rapidapi.com/search/filters?services=";

  let selectedServices = [];
  let selectedGenres = [];

  $("#services :checkbox:checked").each(function () {
    let serviceId = $(this).attr("id");
    if (services.hasOwnProperty(serviceId)) {
      let value = services[serviceId];
      selectedServices.push(value);
    }
  });
  localStorage.setItem("userServices", JSON.stringify(userServices));

  $("#genres :checkbox:checked").each(function () {
    let genreId = $(this).attr("id");
    if (genres.hasOwnProperty(genreId)) {
      let value = genres[genreId];
      selectedGenres.push(value);
    }
  });

  let orderBy = [
    "order_by=popularity_alltime",
    "order_by=popularity_1year",
    "order_by=popularity_1month",
    "order_by=popularity_1week",
  ];
  let randomOrder = Math.round(Math.random() * 3);
  let descending = Math.round(Math.random());
  if (descending === 0) {
    descending = true;
  } else {
    descending = false;
  }

  url += selectedServices.join("%2C");
  url += "&country=us&genres=";
  url += selectedGenres.join("%2C");
  url += `&genres_relation=or&show_type=movie&${orderBy[randomOrder]}&desc=${descending}`;

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      movies = data.result;
      getRandomMovie();
    })
    .catch((error) => console.error(error));
}

function getRandomMovie() {
  if (movieNumber === 25) {
    generateMovie();
    return;
  } else {
    let imdb = movies[movieNumber].imdbId;
    const url = `https://moviesdatabase.p.rapidapi.com/titles/${imdb}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "2ac69e0632mshb00a4ba8e266c71p159332jsn490d9476e71d",
        "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
      },
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        let moviePoster = data.results.primaryImage.url;
        if (moviePoster) {
          $("#moviePoster").attr("src", moviePoster);
        }
      })
      .catch((error) => console.error(error));
    $("#title").text(movies[movieNumber].title);

    let streamingServices = movies[movieNumber].streamingInfo.us;

    let uniqueServices = {};
    $("#streamingList").empty();
    $.each(streamingServices, function (index, service) {
      let serviceName = capitalizeFirstLetter(service.service);
      if (!uniqueServices[serviceName]) {
        uniqueServices[serviceName] = true;

        let anchorElement = $("<a></a>")
          .text(serviceName)
          .attr("href", service.link);

        let liElement = $("<li></li>").append(anchorElement);

        $("#streamingList").append(liElement);
      }
    });
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function tryAgain() {
  movieNumber++;
  getRandomMovie();
}

function storeMovie() {
  goodMovies.push(movies[movieNumber]);
  localStorage.setItem("goodMovies", JSON.stringify(goodMovies));
}

$("#services :checkbox").on("change", function () {
  let serviceId = $(this).attr("id");
  if ($(this).is(":checked")) {
    if (!userServices.includes(serviceId)) {
      userServices.push(serviceId);
    }
  } else {
    let index = userServices.indexOf(serviceId);
    if (index !== -1) {
      userServices.splice(index, 1);
    }
  }

  localStorage.setItem("userServices", JSON.stringify(userServices));
});
