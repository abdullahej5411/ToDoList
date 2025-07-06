const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var items = ["Buy Food.", "Go to Gym.", "Go to Sleep."];
var workItems=[];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));  

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    var today = new Date();
    var options={
        weekday:"long",
        day:"numeric",
        month:"long"
    };
    var day = today.toLocaleDateString("en-US", options);

  res.render("list", {listTitle: day, newListItems: items});
});

app.post("/", function(req, res){
    let item = req.body.newItem.trim();
    if(req.body.list === "Work"){
      if(item!=="")
      {
        workItems.push(item);
      }

      res.redirect("/work");
    }
    else{
      if(item!==""){
        items.push(item);
      }
      res.redirect("/");
    }

});
  

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems})
});

app.post("/work", function(req, res){
  let item = req.body.newItem;
  if(item!==""){
      workItems.push(item);
  }

  ews.redirect("/work");
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

