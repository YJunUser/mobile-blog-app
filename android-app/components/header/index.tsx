import React from "react";
import { View, TouchableNativeFeedback, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

type LogoTitleProps = {
  setOpen: (state: { isOpen: boolean }) => void
}

export const Header = ({ setOpen }: LogoTitleProps) => {
  return (
    <View style={{}}>
      <TouchableNativeFeedback onPress={() => setOpen({ isOpen: true })}>
        <Text>
          <Icon name={'user-circle-o'} size={30} color={'gray'} />
        </Text>
      </TouchableNativeFeedback>
    </View>
  );
};