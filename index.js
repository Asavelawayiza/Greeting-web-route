const express = require("express");
const exphbs = require("express-handlebars");
const greeting = require("./greeting");
const body = require("body-parser");
const flash = require("express-flash");
const session = require("express-session");
const app = express();

const greet = greeting();

const handlebarSetup = exphbs({
  partialsDir: "./views/partials",
  viewPath: "./views",
  layoutsDir: "./views/layouts"
});



app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true
}));


app.use(flash());

app.use(express.static("public"));
app.use(body.urlencoded({ extended: false }));


app.get("/", function (req, res) {
  
  
  console.log(greet.counter())
  res.render("index", {
   name: greet.messaging(),
   caltulate: greet.counter(),
  
});
});

app.post('/greetings', function (req, res) {
 let name = (req.body.firstname).charAt(0).toUpperCase() + (req.body.firstname).slice(1).toLowerCase();
 let lang = req.body.myLanguage

  const myFunc = () => {
    
  if (!name) {
    req.flash('info', 'please enter a name')
  
  }
  else if (!lang) {
    req.flash('info', 'please select a language')
    
  }else{

  greet.language(name, lang) 
  
     req.flash('success', 'successfully added user')
}

    
  res.redirect("/");
  }

  setTimeout(myFunc, 2000)

});

app.get("/actions", function(req, res) {
  
  res.render("actions", {

    actions: greet.getName(),

  });
});


app.get('/counter/:user',  function (req, res) {

  res.render("counter",{

    
  })
});
const PORT = process.env.PORT || 3005;

app.listen(PORT, function () {
  console.log("App started at port:", PORT);
});