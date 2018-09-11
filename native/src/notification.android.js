/*

import firebase from "react-native-firebase";

const channelName = "default_channel_id";
const groupName = "test-group";

const channel = new firebase.notifications.Android.Channel(
  channelName,
  channelName,
  firebase.notifications.Android.Importance.Max
).setDescription("My apps test channel");

const channelGroup = new firebase.notifications.Android.ChannelGroup(
  groupName,
  groupName
);

// Create the channel group
firebase.notifications().android.createChannelGroup(channelGroup);

// Create the channel
firebase.notifications().android.createChannel(channel);

firebase.notifications().onNotification(notification => {
  console.log("notifications-android");
  console.log(notification);

  const item = new firebase.notifications.Notification()
    .setTitle("Android Notification Actions")
    .setBody("Action Body")
    .setNotificationId("notification-action")
    .setSound("default")
    .android.setChannelId(channelName)
    .android.setPriority(firebase.notifications.Android.Priority.Max);

  firebase.notifications().displayNotification(item);
});





*/
