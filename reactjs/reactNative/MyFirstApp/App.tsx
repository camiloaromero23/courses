import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { TaskScreen } from './src/screens/TaskScreen';
// import { FlexScreen } from './src/screens/FlexScreen';
// import { PositionScreen } from './src/screens/PositionScreen';
// import { SizingScreen } from './src/screens/SizingScreen';
// import { BoxObjectModelScreen } from './src/screens/BoxObjectModelScreen';
// import { CounterScreen } from './src/screens/CounterScreen';
// import { HelloWorldScreen } from './src/screens/HelloWorldScreen';

export const App = () => (
  <SafeAreaView style={styles.sav}>
    {/* <SizingScreen /> */}
    {/* <BoxObjectModelScreen /> */}
    {/* <CounterScreen />; */}
    {/* <HelloWorldScreen />; */}
    {/* <PositionScreen /> */}
    {/* <FlexScreen /> */}
    <TaskScreen />
  </SafeAreaView>
);
const styles = StyleSheet.create({
  sav: { flex: 1, backgroundColor: '#28425B' },
});
