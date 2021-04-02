import React from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native";
import { Provider } from 'react-redux';
import Main from './src/navigator';
import { store } from './src/store';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <Provider store={store}>
        <Main />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;