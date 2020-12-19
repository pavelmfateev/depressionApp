const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get('/', (req, res) => {
  res.render("index");
});

app.post('/checklist', (req, res) => {
  console.log(req.body);
  res.render('checklist');
});

// app.get('/r/:name/:id', (req, res) => {
//   const {name, id} = req.params;
//   console.log(req.params);
//   res.send(`<h1>Browsing the ${name} with id: ${id}</h1>`)
// });

// app.get('/search', (req, res) => {
//   const {q, color} = req.query;
//   res.send(`<h1>Browsing the ${color} ${q}</h1>`)
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
