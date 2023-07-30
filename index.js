import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const taskList = ["Do the dishes", "Buy food", "Learn to code", "Play games"];
const workList = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

function getDate() {
  const date = new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}

app.get("/", (req, res) => {
  const day = getDate();
  res.render("index.ejs", { title: day, tasks: taskList });
});

app.get("/work", (req, res) => {
  res.render("index.ejs", { title: "Work List", tasks: workList });
});

app.post("/", (req, res) => {
  const newTask = req.body.newtask;
  console.log(req.body);

  if (req.body.list === "Work") {
    workList.push(newTask);
    res.redirect("/work");
  } else {
    taskList.push(newTask);
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
