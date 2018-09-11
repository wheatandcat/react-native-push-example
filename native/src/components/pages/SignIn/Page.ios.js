import React, { Component } from "react";
import { Text, View, Alert } from "react-native";
import firebase from "react-native-firebase";

export default class extends Component {
  state = {
    fcmToken: "",
    message: {},
    notification: {},
    notificationDisplayed: {},
    enabled: 0,
    notificationBody: ""
  };

  async componentDidMount() {
    console.log(this);

    const fcmToken = await firebase.messaging().getToken();
    const enabled = await firebase.messaging().hasPermission();
    if (!enabled) {
      await firebase.messaging().requestPermission();
    }

    this.setState({
      fcmToken,
      enabled
    });
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
        <View>
          <Text>notification: {JSON.stringify(this.state.notification)}</Text>
        </View>
        <View>
          <Text>
            notificationDisplayed:
            {JSON.stringify(this.state.notificationDisplayed)}
          </Text>
        </View>
      </View>
    );
  }
}
