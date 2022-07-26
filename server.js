const express = require("express");
const cors = require("cors");
//permettre l’accés au backend
const app = express();
var corsOptions = {
origin: "http://localhost:8080"
};
app.use(cors(corsOptions));
// changer les requests de content-type - application/json
app.use(express.json());
// changer les requests content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
.connect(db.url, {
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() => {
console.log("Connected to the database!");
})
.catch(err => {
console.log("Cannot connect to the database!", err);
process.exit();
});


// simple route bienvenu
app.get("/", (req, res) => {
res.json({ message: "welcome to REST DEMO." });
});
require("./app/routes/tutorial.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}.`);
});