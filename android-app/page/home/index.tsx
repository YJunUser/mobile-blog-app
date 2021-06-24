import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableNativeFeedback, TextInput } from 'react-native';
import { useRefresh } from '../../components/refresh';
import { styles } from './style';
import { UsingModal } from '../../components/modal/usingModal';

const HomeScreen = () => {
  const { renderRefreshControl } = useRefresh()

  return (
    // <View style={{ height: '100%' }}>
    <ScrollView showsVerticalScrollIndicator={false}
      refreshControl={renderRefreshControl()}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <UsingModal></UsingModal>
    </ScrollView >
    // </View>
  );
};



export default HomeScreen