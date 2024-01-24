const express = require("express");
const path = require("path");
const http = require("http");

const app = express();

app.use("/", express.static(path.join(__dirname, "client")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "index.html"));
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
