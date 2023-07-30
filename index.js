import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var taskList = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/submit", (req, res) => {
  var newTask = req.body["newtask"];
  taskList.push(newTask);
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.render("index.ejs", { tasks: taskList });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
