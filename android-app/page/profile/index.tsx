
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { baseStyles } from '../../assets/styles'



const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <ListItem containerStyle={styles.avatarListItem}>
        <ListItem.Content>
          <View style={[baseStyles.row, styles.avatarContent]}>
            <Text>个人头像</Text>
            <Avatar rounded icon={{ name: 'user-circle-o', type: 'font-awesome', color: '#000000' }} size='large'></Avatar>
          </View>
        </ListItem.Content>
        <ListItem.Chevron size={28}></ListItem.Chevron>
      </ListItem>
      <ListItem containerStyle={styles.listItem}>
        <ListItem.Content>
          <View style={[baseStyles.row, styles.content]}>
            <Text>昵称</Text>
            <Text>姚伯骏</Text>
          </View>
        </ListItem.Content>
        <ListItem.Chevron size={28}></ListItem.Chevron>
      </ListItem>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  avatarListItem: {
    borderRadius: 10,
    marginTop: 20,
    padding: 0,
    paddingLeft: 10
  },
  listItem: {
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
    paddingRight: 0

  },
  avatarContent: {
    justifyContent: 'space-between',
    width: '110%'
  },
  content: {
    justifyContent: 'space-between',
    width: '105%'
  }
})



export default ProfileScreen

