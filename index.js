const express = require("express");
const path = require("path");
const http = require("http");
const ipfsClient = require("ipfs-http-client");

const ipfs = ipfsClient();

const app = express();

if (NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    ipfs
      .cat(req.url)
      .then((response) => {
        console.log("Содержимое файла:", response.toString());
      })
      .catch((error) => {
        // Обработка ошибки
        if (error.message.includes("404")) {
          res.redirect("/");
        } else {
          console.error("Произошла ошибка:", error);
        }
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
      });
  });
}

app.use((req, res, next) => {
  res.status(404).send("Извините, запрашиваемая страница не найдена.");
});

// Обработчик ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Что-то пошло не так!");
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
