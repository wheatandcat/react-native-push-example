import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import saveToken from "./saveToken";
import refreshToken from "./refreshToken";
import tokens from "./tokens";
import sendMessage from "./sendMessage";

express()
  .use(cors())
  .use(bodyParser.json())
  .get("/hello", (_, response: express.Response) => response.send("world"))
  .post("/tokens", tokens)
  .post("/saveToken", saveToken)
  .post("/refreshToken", refreshToken)
  .post("/sendMessage", sendMessage)

  .listen(8080);
