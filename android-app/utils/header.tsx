import { getFocusedRouteNameFromRoute, Route } from "@react-navigation/native";
import { TabHeader } from "../components/header";
import { Text, StyleSheet } from 'react-native'
import React from "react";

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