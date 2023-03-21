const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const port = (process.env.PORT || 3002);

// connect with mongo
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB").then(() => console.log("Connected with mongoDB!"))

const ArticleSchema = new mongoose.Schema({ title: String, content: String });
const Article = new mongoose.model("Article", ArticleSchema);

app.route("/articles")
.get((req, res) => {
  Article.find({})
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
})
.post((req, res) => {
  const { title, content } = req.body;

  Article.create({ title, content})
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
})
.delete((req, res) => {
  Article.deleteMany({})
    .then(() => res.send("Delete successfull!"))
    .catch((err) => res.send(err));
});

app.route("/articles/:title")
.get((req, res) => {
  const { title } = req.params;
  Article.find({ title })
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
})
.put((req, res) => {
  const { title, content } = req.query;
  console.log(title, content);
  Article.updateOne({ title: req.params.title }, { title, content })
    .then((result) => res.send(result))
    .catch((err) => res.send(err))
})
.delete((req, res) => {
  const { title } = req.params;

  Article.deleteOne({ title })
    .then(() => res.send("Delete Successfull"))
    .catch((err) => res.send(err));
});

app.listen(port, () => console.log("Server is running on port " + port));