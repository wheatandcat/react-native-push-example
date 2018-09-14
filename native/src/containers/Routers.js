import React from "react";
import { Navigation, ScreenVisibilityListener } from "react-native-navigation";
import { ApolloProvider } from "react-apollo";
import Main from "../components/pages/Main/Page";
import Auth from "./Auth";
import Provider from "./Provider";
import NotificationProvider from "./Notification";

const auth = new Auth();

let first = true;

const withProvider = (Component, client) => {
  return class extends Component {
    render() {
      const Comp = (
        <ApolloProvider client={client}>
          <Provider auth={auth}>
            <NotificationProvider first={first} {...this.props}>
              <Component {...this.props} />
            </NotificationProvider>
          </Provider>
        </ApolloProvider>
      );

      first = false;

      return Comp;
    }
  };
};

export function registerScreens(client) {
  Navigation.registerComponent("native.Main", () => withProvider(Main, client));
}

export function registerScreenVisibilityListener() {
  new ScreenVisibilityListener({
    willAppear: ({ screen }) => console.log(`Displaying screen ${screen}`),
    didAppear: ({ screen, startTime, endTime, commandType }) =>
      console.log(
        "screenVisibility",
        `Screen ${screen} displayed in ${endTime -
          startTime} millis [${commandType}]`
      ),
    willDisappear: ({ screen }) =>
      console.log(`Screen will disappear ${screen}`),
    didDisappear: ({ screen }) => console.log(`Screen disappeared ${screen}`)
  }).register();
}
