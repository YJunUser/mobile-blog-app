
import React from 'react'
import { Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { baseStyles } from '../../assets/styles'
import { useAuth } from '../../context/auth-context'
import { useImagePicker } from '../../utils/camera'
import { uploadFiles } from '../../utils/uploadFiles'
import { apiBaseUrl } from '../../api'
import { styles } from './style'


const ProfileScreen = () => {
  const { user, setUser, token } = useAuth()

  const openImagePicker = useImagePicker()

  const getPictureByPicker = async () => {
    try {
      const result = await openImagePicker()
      uploadFiles({
        filePath: result.path,
        url: 'http://sharer.violetfreesia.com:666/sharer-api/upload/avatar',
        token
      }).then(res => {
        const avatarUrl = res.data.avatar
        setUser({ ...user, avatar: avatarUrl })
      }).catch(err => {
        console.log(err)
      })

    } catch (error) {
      console.log(error)
    }

  }

  const isAvatar = user && user.avatar
  return (
    <View style={styles.container}>
      <ListItem containerStyle={styles.avatarListItem}>
        <ListItem.Content>
          <View style={[baseStyles.row, styles.avatarContent]}>
            <Text>个人头像</Text>
            {
              !isAvatar ?
                <Avatar rounded icon={{ name: 'user-circle-o', type: 'font-awesome', color: '#000000' }} size='large' onPress={getPictureByPicker}></Avatar>
                :
                <Avatar rounded source={{ uri: apiBaseUrl + user.avatar }} size={50} onPress={getPictureByPicker}></Avatar>
            }
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



export default ProfileScreen

