import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SnakeGame from "pages/SnakeGame/SnakeGame";
import MainMenuScreen from "pages/MainMenuScreen";
import ThreeInARow from "pages/ThreeInARowGame/ThreeInARow";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import store from "redux/store";

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainMenu">
          <Stack.Screen name="MainMenu" component={MainMenuScreen} />
          <Stack.Screen name="SnakeGame" component={SnakeGame} />
          <Stack.Screen name="ThreeInARow" component={ThreeInARow} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
    padding: 20,
  },
});

export default App;
