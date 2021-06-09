/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
// To finalize installation of react-native-gesture-handler
// add the following at the top (make sure it's at the top and there's nothing else before it) of your entry file, such as index.js or App.js:
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {AndroidApp} from './android-app/andriod';

const App = () => {
  return (
    <NavigationContainer>
      <AndroidApp />
    </NavigationContainer>
  );
};

export default App;
