import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import Navigation from './navi/Navigation';
import { COLORS } from './colors/colors';

export default function App() {
  return (
    <View style={styles.container}>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
