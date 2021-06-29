import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar, Icon, ListItem } from 'react-native-elements'
import { apiBaseUrl } from '../../api';
import { baseStyles } from '../../assets/styles';
import { useAuth } from '../../context/auth-context';
import * as RootNavigation from '../../RootNavigation'
import { goWeb } from '../../utils/goWeb';
import { styles } from './styles';
import { useMenu } from './utils';

export const Menu = (): JSX.Element => {

  const { user } = useAuth()
  const { list, setOpen, isOpen } = useMenu()

  const isAvatar = user && user.avatar
  return (
    <View style={[styles.container, styles.navigationContainer]}>
      <View style={styles.header}>
        {
          isAvatar ? <Avatar rounded size='large' source={{ uri: apiBaseUrl + user.avatar }} onPress={() => {
            // close drawer first
            setOpen(!isOpen)
            // delay time and user can see it
            setTimeout(() => {
              RootNavigation.navigate('ProfileScreen')
            }, 500);
          }}>
          </Avatar> :
            <Avatar rounded size='large' icon={{ name: 'user-circle-o', type: 'font-awesome', color: 'white' }} onPress={() => {
              // close drawer first
              setOpen(!isOpen)
              // delay time and user can see it
              setTimeout(() => {
                RootNavigation.navigate('ProfileScreen')
              }, 500);
            }}>
            </Avatar>
        }
        <TouchableOpacity style={styles.button}>
          <View style={[baseStyles.row]}>
            <Text style={styles.scan} onPress={goWeb}>桌面端</Text>
            {/* <Icon name='ios-scan' type='ionicon' size={14} color={'white'}></Icon> */}
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.main}>
        <Text style={styles.paragraph}>姚伯骏</Text>
        {
          list.map((item, index) => (
            <ListItem key={index} containerStyle={{ backgroundColor: '#000000', margin: 10, padding: 0, marginLeft: 0, }} onPress={item.handler}>
              <Icon name={item.icon} type={item.iconType} color={item.iconColor} size={item.size} ></Icon>
              <ListItem.Content>
                <ListItem.Title style={{ color: '#ffffff', fontSize: 15 }}>{item.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))
        }
      </View>
    </View>
  );
};


