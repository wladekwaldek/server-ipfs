const express = require("express");
const path = require("path");
const http = require("http");
const ipfsClient = require("ipfs-http-client");

const ipfs = ipfsClient();

const app = express();

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
