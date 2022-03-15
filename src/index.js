const express = require("express");
const app = express();
const path = require("path");
const fileUpload = require("express-fileupload");

app.use(express.urlencoded({extended:true}));
app.use(fileUpload());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "register.html"));
});
app.post("/api/users", (req, res) => {
    let profile_pic = req.files.profile_pic;
    profile_pic.mv(path.resolve(__dirname, "public/img", profile_pic.name), () => {
        // Guardado en Base de Datos
        console.log(req.body);
        console.log(profile_pic.name);
        res.redirect("/");
    });
});

app.use((req, res) => res.sendFile(path.resolve(__dirname, "pages", "notFound.html")));

app.set("port", 3000);
app.listen(app.get("port"), () => {
    console.log(`Listening on: http://localhost:${app.get("port")}`);
});