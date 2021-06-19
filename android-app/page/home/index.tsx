import React, { useState } from 'react';
import { Button, ScrollView, Text, View, RefreshControl } from 'react-native';
import { useRefresh } from '../../components/refresh';

const HomeScreen = () => {

  const { renderRefreshControl } = useRefresh()

  return (
    <View style={{ height: '100%' }}>
      <ScrollView showsVerticalScrollIndicator={false}
        refreshControl={renderRefreshControl()}
        style={{ flex: 1 }}>
      </ScrollView >
    </View>
  );
};

export default HomeScreen