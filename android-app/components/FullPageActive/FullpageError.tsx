import React from 'react'
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';


const FullPageError = () => {
  return (
    <View style={styles.container}>
      <Icon size={30} name='error' color={'red'}></Icon>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })

  export default FullPageError