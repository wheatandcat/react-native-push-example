import React, { Component } from "react";
import { Alert, AsyncStorage } from "react-native";
import firebase from "react-native-firebase";
import { start as notification } from "../lib/notification";

const userId = 2;

export default class extends Component {
  async componentDidMount() {
    if (!this.props.first) {
      return;
    }

    let token = await AsyncStorage.getItem("fcmToken");
    console.log("---------------------");
    console.log(token);

    if (!token) {
      // ストレージに無い時は作成
      console.log("---------------------");
      token = await firebase.messaging().getToken();
      console.log(token);

      const response = await fetch("http://localhost:8080/saveToken", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          userId,
          token
        })
      });

      if (!response.ok) {
        Alert.alert("エラー", "リクエストに失敗しました");
        return;
      }

      await AsyncStorage.setItem("fcmToken", token);
    }

    notification(this.receiveData, this.refreshToken);
  }

  receiveData = data => {
    // データで操作する場合は、ここで処理
  };

  refreshToken = async token => {
    const response = await fetch("http://localhost:8080/refreshToken", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        userId,
        token
      })
    });

    if (!response.ok) {
      Alert.alert("エラー", "リクエストに失敗しました");
      return;
    }

    await AsyncStorage.setItem("fcmToken", token);
  };

  render() {
    return this.props.children;
  }
}
