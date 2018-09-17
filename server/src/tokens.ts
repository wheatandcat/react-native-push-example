import { Request, Response } from "express";
import config from "./config";

const Datastore = require("@google-cloud/datastore");
const datastore = new Datastore(config);
const kind = "FcmTokenLog";

export default (request: Request, response: Response) => {
  const query = datastore
    .createQuery(kind)
    .filter("userId", "=", request.body.userId)
    .order("created", {
      descending: true
    });

  datastore
    .runQuery(query)
    .then((results: any) => {
      const fcmTokens = results[0];

      if (fcmTokens.length === 0) {
        response.status(404).send();
        return;
      }

      response.status(200).send(fcmTokens);
    })
    .catch((error: any) => {
      console.log(error);
      response.status(500).send(error);
    });
};
