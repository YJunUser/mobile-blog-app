import { getFocusedRouteNameFromRoute, Route, useNavigation } from "@react-navigation/native";
import { TabHeader } from "../components/header";
import { Text, StyleSheet, View } from 'react-native'
import React from "react";
import * as RootNavigation from '../RootNavigation'
// 根据不同的路由导入不同的header
// eslint-disable-next-line @typescript-eslint/ban-types
export function getHeaderTitle(route: Partial<Route<string, object>>): () => JSX.Element {
  let routeName = ''
  if (route.name === 'TabScreen') {
    routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeScreen'
  } else {
    routeName = route.name
  }

  switch (routeName) {
    case 'HomeScreen':
      return TabHeader;
    case 'ProfileScreen':
      // eslint-disable-next-line react/display-name
      return () => {
        return (<Text style={styles.headerTitle}>编辑个人资料</Text>)
      }
    case 'AboutScreen' :
      return () => {
        return (<Text style={{textAlign: 'center', fontSize: 16}}>关于我们</Text>)
      }
  }
}

export function getEditHeader(setEdit: (isEdit: boolean) => void): () => JSX.Element {
  return () => {
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text onPress={() => setEdit(false)}>取消</Text>
        <Text style={{ color: '#000000', fontWeight: 'bold', fontSize: 16 }}>编辑文件</Text>
        <Text style={{ color: '#1e90ff' }} onPress={() => setEdit(false)}>完成</Text>
      </View>
    )
  }
}

export function recycleHeaderLeft(isEdit: boolean): () => JSX.Element {

  if (isEdit) {
    return null
  } else {
    return () => <Text style={{ marginLeft: 10 }} onPress={() => RootNavigation.navigate('HomeScreen')}>返回</Text>
  }
}

const styles = StyleSheet.create({
  headerTitle: {
    textAlign: 'center',
    marginRight: 55,
    color: '#000000',
    fontWeight: '600',
    fontSize: 14
  }
})