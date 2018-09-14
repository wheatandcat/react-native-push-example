import firebase from "react-native-firebase";

export const start = async onNotificationData => {
  // await firebase.messaging().getToken();

  const enabled = await firebase.messaging().hasPermission();
  if (!enabled) {
    await firebase.messaging().requestPermission();
  }

  firebase.notifications().onNotification(notification => {
    console.log(notification);

    const item = new firebase.notifications.Notification()
      .setNotificationId("notificationId")
      .setTitle("プッシュtestアプリ")
      .setBody(notification.body);

    firebase.notifications().displayNotification(item);
    onNotificationData(notification.data);
  });
};
