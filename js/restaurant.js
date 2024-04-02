let data;

fetch("./restaurant.csv")
  .then((res) => res.text())
  .then((csv) => {
    let rows = csv.split("\n");
    data = rows.map((row = row.split(",")));
  })
  .catch((error) => console.error(error));

console.log(data);
