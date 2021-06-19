import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Icon, ListItem } from 'react-native-elements'
import { baseStyles } from '../../assets/styles';

const list = [{
  title: '收藏夹',
  icon: 'staro',
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
}]


export const Menu = (): JSX.Element => {
  return (
    
    <View style={[styles.container, styles.navigationContainer]}>
      <View style={styles.header}>
        <Avatar rounded icon={{ name: 'user-circle-o', type: 'font-awesome', color: 'white' }} size='large' >
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
              <Icon name={item.icon} type={item.iconType} color={item.iconColor} size={item.size}></Icon>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    color: '#ffffff'
  },
  navigationContainer: {
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70
  },
  scan: { color: 'white', fontSize: 12, marginRight: 8 },
  button: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#a9a9a9",
    height: 30,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 6
  },
  main: {
    marginLeft: 15
  },
  paragraph: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 30
  },
});
