const express = require("express");
const exphbs = require("express-handlebars");
const greeting = require("./greeting");
const body = require("body-parser");
const flash = require("express-flash");
const session = require("express-session");
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/mydb'

const pool = new Pool({
  connectionString
});


const app = express();

const greet = greeting(pool);

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

app.get("/", async function(req, res){


  res.render("index", {
    name: await greet.messaging(),
    caltulate: await greet.counter(),

  });


})


app.post("/", async function (req, res) {
  let name = (req.body.firstname).charAt(0).toUpperCase() + (req.body.firstname).slice(1).toLowerCase();
  let lang = req.body.myLanguage

  if (!name) {
    req.flash('info', 'please enter a name')

  }
  else if (!lang) {
    req.flash('info', 'please select a language')
    // console.log(req.flash());

  } else {

      await greet.language(name, lang)

    req.flash('success', 'successfully updated')
  }




  res.render("index", {
    name: await greet.messaging(),
    caltulate: await greet.counter(),

  });

});

app.get("/actions", async function (req, res) {
 
  // console.log('name', await greet.getName());
  
  res.render("actions", {

    actions: await greet.getName(),

  });
});


app.get('/counter/:user', async function (req, res) {

  let users = req.params.user
  // console.log(user +"fghj");
  
 
  let data = 
      await greet.getCounter(users)
  
  console.log('users',  await greet.getCounter(users));


  let display =  `Hello, ${users} has been greeted ${data.greet_count} time(s). `

  res.render('users', {

    data,
    display
  });

});

app.post('/clear', async function (req, res) {
  let clear = await greet.clearCounter();
 
  res.redirect('/');
});



const PORT = process.env.PORT || 3003;

app.listen(PORT, function () {
  console.log("App started at port:", PORT);
});

