const express = require("express");
const { port, secret } = require("./config");
const { engine } = require("express-handlebars");
const path = require("path");

// Importando rutas
const userRouter = require("./routes/usersRoutes");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/postsRoutes");
const session = require("express-session");
const addSessionToTemplate = require("./middleware/addSessionToTemplate");
const { DateTime } = require("luxon");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));

app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(addSessionToTemplate);

app.engine(
  "hbs",
  engine({
    extname: "hbs",
    partialsDir: path.join(__dirname, "views", "components"),
    helpers: {
      formatDate: function (date) {
        const newDate = DateTime.fromJSDate(date);
        return newDate.toFormat("yyyy LLL dd");
      },
      formatHour: function (date) {
        const newDate = DateTime.fromJSDate(date);
        return newDate.toFormat("HH:mm");
      },
      isOwner: function(username, owner){
        return username === owner;
      }
    },
  })
);

app.set("view engine", "hbs");
app.set("views", "views");
app.use(authRouter);
app.use(userRouter);
app.use(postRouter);

app.listen(port, () => {
  console.log("Running... http://localhost:" + port);
});
