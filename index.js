// SETUP
const express = require("express"),
  app = express(),
  port = 3000,
  path = require("path"),
  methodOverride = require("method-override"),
  checklistsRoutes = require("./routes/checklists.js"),
  chartsRoutes = require("./routes/charts.js"),
  ExpressError = require("./utils/ExpressError.js"),
  catchAsync = require("./utils/catchAsync.js"),
  mongoose = require("mongoose"),
  ejsMate = require("ejs-mate");

mongoose.set("useFindAndModify", false);
mongoose.connect("mongodb://localhost:27017/depressionApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.use(express.static(path.join(__dirname, "public")));
app.get("/Chart.bundle.min.js", (req, res) => {
  res.sendFile(__dirname + "/node_modules/chart.js/dist/Chart.bundle.min.js");
});
//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }));
// To parse incoming JSON in POST request body:
app.use(express.json());
// To 'fake' put/patch/delete requests:
app.use(methodOverride("_method"));
// Views folder and EJS setup:
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use("/checklists", checklistsRoutes);
app.use("/charts", chartsRoutes);

// ROUTES
app.get("/", (req, res) => {
  res.render("index");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh no; something went wrong!";
  res.status(statusCode).render("error", {err});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
