import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import Main from './src/navigator';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor="transparent" barStyle={'dark-content'} />
      <Main />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 }
});

export default App;