import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar, Icon, ListItem } from 'react-native-elements'
import { baseStyles } from '../../assets/styles';
import { useAuth } from '../../context/auth-context';
import * as RootNavigation from '../../RootNavigation'
import { MenuProps } from '../../types/menu';
import { styles } from './styles';

export const Menu = (): JSX.Element => {
  const { setOpen, logout } = useAuth()
  const list: MenuProps[] = [{
    title: '回收站',
    icon: 'delete',
    iconType: 'ant-design',
    iconColor: 'yellow',
    size: 20
  },
  {
    title: '设置',
    icon: 'setting',
    iconType: 'ant-design',
    iconColor: 'gray',
    size: 20
  }, {
    title: '退出',
    icon: 'logout',
    iconType: 'ant-design',
    iconColor: 'blue',
    size: 20,
    handler: logout
  }]
  return (
    <View style={[styles.container, styles.navigationContainer]}>
      <View style={styles.header}>
        <Avatar rounded icon={{ name: 'user-circle-o', type: 'font-awesome', color: 'white' }} size='large' onPress={() => {
          // close drawer first
          setOpen({ open: false })
          // delay time and user can see it
          setTimeout(() => {
            RootNavigation.navigate('ProfileScreen')
          }, 500);
        }}>
        </Avatar>
        <TouchableOpacity style={styles.button}>
          <View style={[baseStyles.row]}>
            <Text style={styles.scan}>桌面端</Text>
            <Icon name='ios-scan' type='ionicon' size={14} color={'white'}></Icon>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.main}>
        <Text style={styles.paragraph}>姚伯骏</Text>
        {
          list.map((item, index) => (
            <ListItem key={index} containerStyle={{ backgroundColor: '#000000', margin: 10, padding: 0, marginLeft: 0, }}>
              <Icon name={item.icon} type={item.iconType} color={item.iconColor} size={item.size} onPress={item.handler}></Icon>
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


