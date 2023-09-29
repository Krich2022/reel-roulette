$(function () {
  $("button").on("click", generateMovie);
});

const genres = [
  "horror",
  "adventure",
  "fantasy",
  "animation",
  "drama",
  "action",
  "comedy",
  "history",
  "western",
  "thriller",
  "crime",
  "documentary",
  "sciFi",
  "mystery",
  "music",
  "romance",
  "family",
  "war",
];

const services = {
  netflix: "netflix",
  prime: "prime.subscription",
  buyRent: "prime.rent,prime.buy,apple.rent,apple.buy",
  HBOmax: "hbo,hulu.addon.hbo,prime.addon.hbomaxus",
  hulu: "hulu.subscription,hulu.addon.hbo",
  apple: "apple.addon",
  peacock: "peacock.free",
};
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "2ac69e0632mshb00a4ba8e266c71p159332jsn490d9476e71d",
    "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
  },
};

let url =
  "https://streaming-availability.p.rapidapi.com/search/filters?services=";
function generateMovie(e) {
  e.preventDefault();
  let selectedServices = [];

  $("#services :checkbox:checked").each(function () {
    let checkboxId = $(this).attr("id");
    if (services.hasOwnProperty(checkboxId)) {
      let value = services[checkboxId];
      selectedServices.push(value);
    }
  });

  url += selectedServices.join(",");
  url += "&country=%3CREQUIRED%3E&keyword=";

  $("#genres :checkbox:checked").each(function () {
    let checkboxId = $(this).attr("id");
  });

  console.log(url);

  //   fetch(url, options)
  //     .then((response) => response.json())
  //     .then((data) => console.log(data))
  //     .catch((error) => console.error(error));
}
