const express = require("express");
const { port, secret } = require("./config");
const { engine } = require("express-handlebars");
const path = require("path");

// Importando rutas
const userRouter = require("./routes/usersRoutes");
const authRouter = require("./routes/auth");
const session = require("express-session");
const addSessionToTemplate = require("./middleware/addSessionToTemplate");

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

app.use(addSessionToTemplate)

app.engine(
  "hbs",
  engine({
    extname: "hbs",
    partialsDir: path.join(__dirname, "views", "components"),
    helpers: {},
  })
);

app.set("view engine", "hbs");
app.set("views", "views");
app.use(authRouter);
app.use(userRouter);

app.listen(port, () => {
  console.log("Running... http://localhost:" + port);
});
