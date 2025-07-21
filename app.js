const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let items = [
  { name: "Buy Food.", completed: false },
  { name: "Go to Gym.", completed: false },
  { name: "Go to Sleep.", completed: false }
];
let workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  let day = today.toLocaleDateString("en-US", options);
  res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
  const itemName = req.body.newItem.trim();
  if (req.body.list === "Work") {
    if (itemName !== "") {
      workItems.push({ name: itemName, completed: false });
    }
    res.redirect("/work");
  } else {
    if (itemName !== "") {
      items.push({ name: itemName, completed: false });
    }
    res.redirect("/");
  }
});

app.post("/toggle", function (req, res) {
  const { listType, index } = req.body;
  const idx = parseInt(index);

  if (listType === "Work") {
    workItems[idx].completed = !workItems[idx].completed;
    res.redirect("/work");
  } else {
    items[idx].completed = !items[idx].completed;
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work", newListItems: workItems });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});


app.get("/about", function (req, res) {
  res.render("about");
});
