const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var items = ["Buy Food.", "Go to Gym.", "Go to Sleep."];

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

  res.render("list", {aday:day, newListItems: items});
});

app.post("/", function(req, res){
    item = req.body.newItem;
    items.push(item);   
    res.redirect("/");    
});
 
app.listen(3000, () => {
  console.log('Server running on port 3000');
});

