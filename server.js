const express = require("express");
const { port } = require("./config/index");
const {engine} = require("express-handlebars");


const app = express();

app.engine('hbs',engine({
  extname:"hbs",
  partialsDir: ["views/components"],
  layoutsDir: "views/layouts",
  helpers:{
  }
}))

app.set("view engine",'hbs')
app.set("views","views")



app.get("/", (req, res) => {
    return res.render("home")
})


app.listen(port, () => {
  console.log("Running... http://localhost:" + port);
});
