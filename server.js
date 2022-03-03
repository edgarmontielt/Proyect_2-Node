const express = require("express");
const { port } = require("./config/index");
const app = express();


app.get("/saludo", (req, res) => {
    return res.send("Hola")
})

app.listen(port, () => {
  console.log("Running... http://localhost:" + port);
});
