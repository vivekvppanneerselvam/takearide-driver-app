import React from 'react';
import { View, StyleSheet } from 'react-native';
import Root from "./src";
function App(props) {
  return (
    <View style={styles.container}>
      <Root {...props} />
    </View>
  );

}


export default App

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});