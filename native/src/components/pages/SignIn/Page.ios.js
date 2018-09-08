import React, { Component } from "react";
import { Text, View } from "react-native";
import firebase from "react-native-firebase";

export default class extends Component {
  state = {
    fcmToken: "",
    message: {},
    enabled: 0
  };

  async componentDidMount() {
    const fcmToken = await firebase.messaging().getToken();
    console.log(fcmToken);

    this.onTokenRefreshListener = firebase
      .messaging()
      .onTokenRefresh(fcmToken => {
        this.setState({
          fcmToken
        });
      });

    const enabled = await firebase.messaging().hasPermission();
    console.log(enabled);
    await firebase.messaging().requestPermission();

    this.setState({
      fcmToken,
      enabled
    });

    this.messageListener = firebase.messaging().onMessage(message => {
      // Process your message as required
      this.setState({ message });
    });

    // ① プッシュ通知を押してクローズからの起動
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();

    if (notificationOpen) {
      console.log(notificationOpen);
    }

    // ② プッシュ通知を押してバックグラウンドからの復帰
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        console.log(notificationOpen);
      });

    // ③ アプリが起動中にプッシュ通知が来た時
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        console.log(notification);
      });
  }
  componentWillUnmount() {
    this.onTokenRefreshListener();
    this.messageListener();
    this.notificationOpenedListener();
    this.notificationListener();
  }

  render() {
    return (
      <View>
        <Text>test</Text>
        <View>
          <Text>fcmToken: {this.state.fcmToken}</Text>
        </View>
        <View>
          <Text>enabled: {this.state.enabled}</Text>
        </View>
        <View>
          <Text>message: {JSON.stringify(this.state.message)}</Text>
        </View>
      </View>
    );
  }
}
