let data = [];

fetch("./server/restaurant.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => console.error("Error loading JSON file", error));

const resDiv = document.getElementById("restaurantList");
data.map((elem) => {
  let newDiv = document.createElement("div");
  newDiv.id = elem.id;
  newDiv.innerHTML = `
    <div class="flex_item_${iter%2}">
        <button class="restaurant">
            <p class="name">${elem.restaurant_name}</p>
            <p class="price">${elem.price_tag}</p>
            <p class="date">${elem.dates}</p>
            <span class="button dangerButton smButton deleteButton" data-index="${index}">X</span>
        </button>
    </div>`;
  resDiv.appendChild(newDiv);
});

/*
let restaurants = [];
let iter = 0;

function renderRestaurants() {
    restaurantsContainer.innerHTML = '';
    restaurants.forEach(function(restaurant, index) {
        const restaurantElement = document.createElement('div');
        restaurantElement.innerHTML = `
            <div for="restaurant${index}" class="flex_item_${iter%2}">
                <button class="restaurant">
                    <p class="name">${restaurant.restaurant_name}</p>
                    <p class="price">${restaurant.price_tag}</p>
                    <p class="date">${restaurant.dates}</p>
                    <button class="button dangerButton smButton deleteButton" data-index="${index}">X</button>
                </button>
            </div>
        `;
        iter++;
        restaurantsContainer.appendChild(taskElement);

        const deleteBtn = taskElement.querySelector('.deleteButton');
        deleteBtn.addEventListener('click', function() {
            restaurants.splice(index, 1);
            renderRestaurants();
        });
    });
}

*/