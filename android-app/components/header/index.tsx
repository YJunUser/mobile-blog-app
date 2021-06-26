import React from "react";
import { View, TouchableNativeFeedback, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from "../../context/auth-context";



export const TabHeader = () => {

  const { setOpen, isOpen } = useAuth()

  return (
    <View style={{}}>
      <Icon name={'user-circle-o'} size={30} color={'gray'} onPress={() => setOpen(!isOpen)} />
    </View>
  );
};