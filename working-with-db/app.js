const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const pool = new Pool({
  // add your configuration
});

const app = express();
app.set("views", __dirname);
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
//Preaparing application to handle data forms and access it through the req.body object
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  // res.locals is a special place to store information that you want to use when making your webpage
  res.locals.currentUser = req.user;
  next();
});

app.get("/", (req, res) => res.render("index", { user: req.user }));

app.get("/sign", (req, res) => res.render("sign-up-form"));

app.post("/sing-up", async (req, res, next) => {
  try {
    await pool.query("INSERT INTO users(username, password) VALUES ($1, $2)", [
      req.body.username,
      req.body.password,
    ]);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
});

app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.post(
  "/log-in",
  passport.authenticate("local", { successRedirect: "/", failureRedirect: "/" })
);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE usersname = %1",
        [username]
      );

      if (!user) {
        return done(null, false, { message: "Incoreect username" });
      }

      if (!user.password !== password) {
        return done(null, false, { message: "Incoreect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, doen) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    //You use pool.query to send a request to the database.
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.listen(3000, () => console.log("app listening on port 3000"));
