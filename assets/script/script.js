$("button").on("click", generateMovie);
const services = [
    "netflix",
    "prime.subscription",
    "prime.rent,prime.buy,apple.rent,apple.buy",
    "hbo,hulu.addon.hbo,prime.addon.hbomaxus",
    "hulu.subscription,hulu.addon.hbo",
    "apple.addon",
    "peacock.free",
];
let url =
    "https://streaming-availability.p.rapidapi.com/search/filters?services=&country=us&output_language=en&order_by=original_title&genres_relation=and&show_type=all";
function generateMovie() {}
