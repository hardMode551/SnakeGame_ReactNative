import React from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
import App from './App';
import appJson from '../app.json';

const Index = () => {
  return (
    <View style={globalStyles.container}>r
      <App />
    </View>
  );
};

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Light background for the whole screen
    padding: 10,
  },
  text: {
    fontFamily: 'Arial', // Global font
    fontSize: 16,
    color: '#343a40', // Dark text color
  },
});

AppRegistry.registerComponent(appJson.expo.name, () => Index);
