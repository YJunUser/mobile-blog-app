import React from "react";
import { View } from "react-native";
import { Avatar } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import { apiBaseUrl } from "../../api";
import { useAuth } from "../../context/auth-context";



export const TabHeader = () => {

  const { setOpen, isOpen, user } = useAuth()

  const isAvatar = user && user.avatar
  return (
    <View style={{}}>
      {/* <Icon name={'user-circle-o'} size={30} color={'gray'} onPress={() => setOpen(!isOpen)} /> */}
      {
        isAvatar ?
          <Avatar
            rounded
            source={{ uri: apiBaseUrl + user.avatar }}
            size={30}
            onPress={() => setOpen(!isOpen)}
          /> :
          <Icon name={'user-circle-o'} size={30} color={'gray'} onPress={() => setOpen(!isOpen)} />
      }


    </View>
  );
};