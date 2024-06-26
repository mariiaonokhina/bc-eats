import { restaurant_list } from "./restaurantdb.js";

// HTML Elements
const restaurantImageContainer = document.querySelectorAll(".restaurant-image");
const iframeMap = document.querySelector(".embeded-map");
const gMapButton = document.querySelector(".gMap-btn");
const restaurantName = document.querySelector(".restaurant-name");
const tagsList = document.querySelector(".tags");
const dateList = document.querySelector(".dates");
const descriptionP = document.querySelector(".description");
const websiteLink = document.querySelector(".restaurant-link");
const priceP = document.querySelector(".price_tag");
const distanceP = document.querySelector(".distance-mile");
const getThere = document.querySelector(".get-there");

// Functionality
document.addEventListener("DOMContentLoaded", () => {
  const queryParams = new URLSearchParams(window.location.search);
  const restaurantId = queryParams.get("id");
  updateUI(restaurant_list[restaurantId]);
});

function updateUI(data) {
  console.log(data);
  // Updating Image
  restaurantImageContainer[0].src = data["images_url"][0];
  restaurantImageContainer[1].src = data["images_url"][1];

  // Updating Iframe
  iframeMap.attributes[0].value = `https://maps.google.com/maps?q=${data["lat"]},${data["lon"]}&hl=es;&output=embed`;

  // Updating Map-Button
  gMapButton.href = data["google_maps_url"];

  // Updating Title
  restaurantName.innerHTML = `${data["restaurant_name"]} <span class="heart">♡</span>`;
  const heart = document.querySelector(".heart");

  // updateFavoriteBtn(data["id"]);

  heart.addEventListener("click", () => {
    if (heart.textContent == "♡") {
      fetch;
      heart.innerHTML = "♥";
      heart.style.fontSize = "3rem";
    } else {
      heart.innerHTML = "♡";
      heart.style.fontSize = "2.5rem";
    }
  });

  // Updating Tags
  data["tags"].forEach((tag) => {
    const li = document.createElement("li");
    li.textContent = tag;
    tagsList.appendChild(li);
  });

  //Updating Price Tag
  priceP.innerHTML = `<strong>Price Tag:</strong> ${data["price_tag"]}`;

  // Update Distance
  distanceP.innerHTML = `<strong>Distance in Miles:</strong> ${data["distance_miles"]}`;
  getThere.innerHTML = `<strong>Get There:</strong> ${data["distance_time"]}`;

  // Updating Dates
  data["dates"].forEach((date) => {
    const [day, ...timeArr] = date.split(" ");
    const time = timeArr.join(" ");

    const span = document.createElement("span");
    span.textContent = day;

    const li = document.createElement("li");
    li.innerHTML = `<span>${day}</span> ${time}`;

    dateList.appendChild(li);
  });

  // Updating Description:
  descriptionP.textContent = data["description"];

  // Updating Website Link
  websiteLink.href = data["website"];
}

// function updateFavoriteBtn(restaurant_id) {
//   console.log("Colachon ", restaurant_id);
//   const heart = document.querySelector(".heart");
//   fetch(`http://localhost:8080/favorites`)
//     .then((response) => response.json())
//     .then((favoritesData) => {
//       console.log(favoritesData);
//       for (let restaurant of favoritesData) {
//         if (restaurant.id === restaurant_id) {
//           heart.textContent = "♥";
//           heart.style.fontSize = "3rem";
//           break;
//         }
//       }
//     })
//     .catch((error) => console.error("Fetch Error:", error));
// }
