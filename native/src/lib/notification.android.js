import firebase from "react-native-firebase";

export const start = onNotificationData => {
  // サーバーには↓のトークンを保存するように修正
  // await firebase.messaging().getToken();

  firebase.notifications().onNotification(notification => {
    notification
      .setTitle("プッシュtestアプリ")
      .android.setChannelId("test-channel")
      .android.setSmallIcon("ic_launcher");
    firebase.notifications().displayNotification(notification);

    onNotificationData(notification.data);
  });
};
