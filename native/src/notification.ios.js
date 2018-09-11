import firebase from "react-native-firebase";

firebase.notifications().onNotification(notification => {
  console.log("notifications");

  const item = new firebase.notifications.Notification()
    .setNotificationId("notificationId")
    .setTitle("test-app")
    .setBody(notification.body);

  firebase.notifications().displayNotification(item);
});
