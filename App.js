import React from 'react';
import { SafeAreaView } from 'react-native';
import AppContainer from './src/components/AppContainer';

import styles from './assets/styles';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <AppContainer />
    </SafeAreaView>
  );
}

export default App;
