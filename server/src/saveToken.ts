import { Request, Response } from "express";
import config from "./config";

const Datastore = require("@google-cloud/datastore");
const uuidv1 = require("uuid/v1");
const datastore = new Datastore(config);
const kind = "FcmTokenLog";

export default (request: Request, response: Response) => {
  const key = datastore.key([kind, uuidv1()]);

  const date = new Date();

  const data = {
    userId: request.body.userId,
    token: request.body.token,
    created: date.getTime()
  };

  const value = { key, data };
  datastore
    .save(value)
    .then(() => {
      response.status(201).send(data);
    })
    .catch((error: any) => {
      console.log(error);
      response.status(500).send(error);
    });
};
