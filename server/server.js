import appModulePath from "app-module-path";
import http from "http";
import express from "express";
import cors from "cors";
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const parser = new Readline();
const port = new SerialPort("COM1", {
  baudRate: 57600,
});
port.pipe(parser);
parser.on("data", (line) => console.log(line));
appModulePath.addPath(`${__dirname}`);

const Api = express();
const HTTP = http.Server(Api);

Api.use(cors());
// Parse URL-encoded bodies (as sent by HTML forms)
// Api.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
Api.use(express.json());

Api.get("/test", (req, res) => res.status(200).send(`success!`));

Api.post("/", function (request, response) {
  if (!request.body) return response.sendStatus(400);
  port.write(request.body.text, (err) => {
    if (err) console.log("Error on write: ", err.message);
    console.log("message written");
  });
  response.status(200);
});

HTTP.listen(9001, () => {
  console.log("listening on *:9001");
});
