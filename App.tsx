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
// navigation
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './android-app/RootNavigation'
import { AndroidApp } from './android-app/andriod';
// context
import { AppProvider } from './android-app/context';
// safeArea
import { SafeAreaProvider } from 'react-native-safe-area-context';
// UI styles
import { ThemeProvider } from 'react-native-elements';
// react-query
import { QueryClient, QueryClientProvider } from 'react-query'

// ignore the warning setting Setting a timer for a long period of time, i.e. multiple minutes
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);


const App = () => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider>
          <AppProvider>
            <NavigationContainer ref={navigationRef}>
              <AndroidApp />
            </NavigationContainer>
          </AppProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
