import { Request, Response } from "express";
import { config } from "./config";

const Datastore = require("@google-cloud/datastore");
const datastore = new Datastore(config);
const kind = "FcmToken";

export default (request: Request, response: Response) => {
  const query = datastore
    .createQuery(kind)
    .filter("userId", "=", request.body.userId);

  datastore.runQuery(query).then(results => {
    const fcmTokens = results[0];

    if (fcmTokens.length === 0) {
      response.status(404).send();
      return;
    }

    const key = datastore.key([kind, fcmTokens[0].key]);
    const data = {
      userId: request.body.userId,
      token: request.body.token
    };
    const value = { key, data };
    datastore
      .save(value)
      .then(() => {
        response.status(201).send(data);
      })
      .catch(error => {
        console.log(error);
        response.status(500).send(error);
      });
  });
};
