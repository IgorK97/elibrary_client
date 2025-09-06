import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import { add } from '@mono/utils';
// import { CheckBox } from '@mono/ui';
import { useState } from 'react';

export default function App() {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <StatusBar backgroundColor="blue" />

      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        {/* <CheckBox value={isChecked} onChange={() => setIsChecked(!isChecked)} /> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
