import React from "react";
import { View, TouchableNativeFeedback, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from "../../context/auth-context";



export const TabHeader = () => {

  const { setOpen } = useAuth()

  return (
    <View style={{}}>
      <TouchableNativeFeedback onPress={() => setOpen({ open: true })}>
        <Text>
          <Icon name={'user-circle-o'} size={30} color={'gray'} />
        </Text>
      </TouchableNativeFeedback>
    </View>
  );
};