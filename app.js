const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const port = (process.env.PORT || 3002);

app.get("/", (req, res) => {
  res.send("<h1>hello</h1>")
})

app.listen(port, () => console.log("Server is running on port " + port));