const express = require("express");
const path = require("path");
const http = require("http");

const app = express();

const router = express.Router();

app.use(express.static(path.join(__dirname, "client", "build")));

router.get("/list", (req, res) => {
  res.send("fcuckikaki");
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

async function start() {
  try {
    app.listen(5000, () => {
      console.log("Server has been started on port" + 5000);
    });
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
}
start();
