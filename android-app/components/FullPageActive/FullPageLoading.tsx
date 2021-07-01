import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Image } from 'react-native-elements';

const FullPageLoading = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/image/cloud.png')} style={{width: 100, height: 100}}></Image>
      <Text style={{ fontSize: 40, fontWeight: 'bold' }}>Sharer</Text>
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

export default FullPageLoading