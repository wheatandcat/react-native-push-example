import * as admin from "firebase-admin";
import { Request, Response } from "express";
import config from "./config";
import serviceAccount from "./serviceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://example-202505.firebaseio.com"
});

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

      const message = {
        notification: {
          title: "通知",
          body: "今日も一日頑張ろう！"
        },
        token: fcmTokens[0].token
      };

      admin
        .messaging()
        .send(message)
        .then(result => {
          console.log("Successfully sent message:", result);

          response.status(200).send();
        })
        .catch(error => {
          console.log("Error sending message:", error);
          response.status(500).send(error);
        });
    })
    .catch((error: any) => {
      console.log(error);
      response.status(500).send(error);
    });
};
