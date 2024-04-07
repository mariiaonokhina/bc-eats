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

// Functionality
document.addEventListener("DOMContentLoaded", () => {
  const queryParams = new URLSearchParams(window.location.search);

  const restaurantId = queryParams.get("id");

  fetch(`http://localhost:8080/restaurants/${restaurantId}`)
    .then((response) => response.json())
    .then((restaurantData) => {
      updateUI(restaurantData);
    })
    .catch((error) => console.error("Fetch Error:", error));
});

function updateUI(data) {
  // Updating Image
  restaurantImageContainer[0].src = data["images_url"][0];
  restaurantImageContainer[1].src = data["images_url"][1];

  // Updating Iframe
  iframeMap.attributes[0].value = `https://maps.google.com/maps?q=${data["lat"]},${data["lon"]}&hl=es;&output=embed`;
  // console.log(iframeMap.attributes);

  // Updating Map-Button
  gMapButton.href = data["google_maps_url"];

  // Updating Title
  restaurantName.innerHTML = `${data["restaurant_name"]} <span class="heart">&#x2661</span>`;
  const heart = document.querySelector(".heart");

  heart.addEventListener("click", () => {
    console.log(heart.innerHTML);
    if (heart.textContent == "♡") {
      heart.innerHTML = "♥";
      heart.style.fontSize = "4rem";
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
