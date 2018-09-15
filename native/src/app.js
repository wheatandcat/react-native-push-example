import { Platform, AsyncStorage } from "react-native";
import { Navigation } from "react-native-navigation";
import {
  registerScreens,
  registerScreenVisibilityListener
} from "./containers/Routers";

registerScreens();
registerScreenVisibilityListener();

const tabs = [
  {
    label: "Main",
    screen: "native.Main",
    icon: require("../img/list.png"),
    title: "Main"
  },
  {
    label: "Sub",
    screen: "native.Main",
    icon: require("../img/user.png"),
    title: "Sub"
  }
];

Navigation.startTabBasedApp({
  tabs,
  animationType: Platform.OS === "ios" ? "slide-down" : "fade",
  tabsStyle: {
    tabBarBackgroundColor: "#ffffff",
    tabBarButtonColor: "#888888",
    tabBarSelectedButtonColor: "#FF9933",
    tabFontFamily: "BioRhyme-Bold"
  },
  appStyle: {
    tabBarBackgroundColor: "#003a66",
    navBarButtonColor: "#000000",
    tabBarButtonColor: "#000000",
    navBarTextColor: "#111111",
    tabBarSelectedButtonColor: "#ff505c",
    navigationBarColor: "#003a66",
    navBarBackgroundColor: "#ffffff",
    statusBarColor: "#002b4c",
    tabFontFamily: "BioRhyme-Bold"
  }
});

console.disableYellowBox = true;
