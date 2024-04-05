const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;
const restaurants = require("./restaurant.json");
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

app.listen(PORT, () => {
  console.log(`listening to Port: ${PORT}`);
});
