import firebase from "react-native-firebase";
import { Alert } from "react-native";

export const start = async (onNotificationData, onTokenRefresh) => {
  const enabled = await firebase.messaging().hasPermission();
  if (!enabled) {
    await firebase.messaging().requestPermission();
  }

  firebase.notifications().onNotification(notification => {
    const item = new firebase.notifications.Notification()
      .setNotificationId("notificationId")
      .setTitle("プッシュtestアプリ")
      .setBody(notification.body)
      .setData({
        key1: "value1",
        key2: "value2"
      });

    firebase.notifications().displayNotification(item);

    onNotificationData(notification.data);
  });

  firebase.messaging().onTokenRefresh(fcmToken => {
    onTokenRefresh(fcmToken);
  });
};
