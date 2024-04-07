const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;
const restaurants = require("./restaurant.json");
const favorites = require("./favorites.json");
const fs = require("fs");

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send({ message: "Working" });
});

app.get("/restaurants", (req, res) => {
  res.send(restaurants);
});

app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  res.send(restaurants[id]);
});

app.get("/favorites", (req, res) => {
  console.log("Returning All Favorite Restaurants");
  const favoriteRestaurant = favorites.map(
    (restaurant_id) => restaurants[restaurant_id]
  );
  res.json(favoriteRestaurant);
});

app.post("/favorites/:id", (req, res) => {
  console.log("adding to favorites");
  const restaurant_id = parseInt(req.params.id);

  if (!favorites.includes(restaurant_id)) {
    favorites.push(restaurant_id);
  }
  saveFavoritesData();
  res.json({ message: "Favorite Added Successfully", favorites });
});

app.delete("/favorites/:id", (req, res) => {
  console.log("removing to favorites");
  const restaurant_id = parseInt(req.params.id);

  const index = favorites.findIndex((id) => id == restaurant_id);

  favorites.slice(index, 1);
  if (index !== -1) {
    favorites.splice(index, 1);
    saveFavoritesData();
  } else {
    res.status(404).json({ error: "Restaurant not found" });
  }

  res.json({ message: "Favorite Remove Successfully", favorites });
});

app.listen(PORT, () => {
  console.log(`listening to Port: ${PORT}`);
});

function saveFavoritesData() {
  fs.writeFile(
    "./favorites.json",
    JSON.stringify(favorites, null, 2),
    (err) => {
      if (err) {
        console.error("Error saving data:", err);
      }
    }
  );
}
