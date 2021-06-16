import React from 'react';
import { Button, Text, View } from 'react-native';

export const HomeScreen = ({ navigation }) => {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Button onPress={() => navigation.navigate('Detail')} title='Go to Details'></Button>
    </View >
  );
};
