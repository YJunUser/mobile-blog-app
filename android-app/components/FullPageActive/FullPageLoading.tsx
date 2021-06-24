import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'


const FullPageLoading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color='#0000ff'></ActivityIndicator>
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