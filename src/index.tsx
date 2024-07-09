import 'react-native-gesture-handler';
import React from "react";
import { AppRegistry } from "react-native";
import App from "./App";
import appJson from "../app.json";

const Index = () => {
  return <App />;
};

AppRegistry.registerComponent(appJson.expo.name, () => Index);
