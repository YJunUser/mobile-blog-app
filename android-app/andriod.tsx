import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CardStyleInterpolators, createStackNavigator, } from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Drawer } from './components/drawer';
import { AboutScreen } from './page/about';
import { getEditHeader, getHeaderTitle, recycleHeaderLeft } from './utils/header';
import { useAuth } from './context/auth-context';
import { Suspense } from 'react';
import { Text } from 'react-native'

import ProfileScreen from './page/profile/index';
import FullPageLoading from './components/FullPageActive/FullPageLoading';
import FileScreen from './page/file-detail';
import RecycleFileScreen from './page/recycle-file';
import HomeScreen from './page/home';
import LoginScreen from './page/unauth/login';
import RegisterScreen from './page/unauth/register';
import SharerScreen from './page/sharer';





// Tab-bar Screen
const BottomTab = () => {
  const Tab = createBottomTabNavigator();
  const { isEdit } = useAuth()


  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }: { focused: boolean, color: string, size: number }) => {
          let iconName: string;
          if (route.name === 'HomeScreen') {
            iconName = focused ? 'twitter' : 'twitter';
          } else if (route.name === 'ShareScreen') {
            iconName = focused ? 'vcard-o' : 'vcard-o';
          }
          // You can return any component that you like here!
          return <Icon name={iconName || ''} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#6495ed',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ tabBarVisible: !isEdit, tabBarLabel: '文件'}} />
      <Tab.Screen name="ShareScreen" component={SharerScreen} options={{ tabBarLabel: '我的分享'}}/>
    </Tab.Navigator>
  );
};



// Main 
const Stack = createStackNavigator(

);

export const AndroidApp = () => {
  const { token, isEdit, setEdit } = useAuth()

  return (
    <>
      {
        token ? (
          <Suspense fallback={<FullPageLoading></FullPageLoading>}>
            <Drawer>
              <Stack.Navigator>
                <Stack.Screen
                  name="TabScreen"
                  component={BottomTab}
                  options={({ route }) => ({
                    // headerTitle: getHeaderTitle(route),
                    headerTitle: isEdit ? getEditHeader(setEdit) : getHeaderTitle(route),
                  })}
                />
                <Stack.Screen
                  name='ProfileScreen'
                  component={ProfileScreen}
                  options={({ route }) => ({
                    headerTitle: getHeaderTitle(route),
                    gestureDirection: 'horizontal', // 手势的方向
                    gestureEnabled: true, // 启用安卓的手势返回
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS // 将ios翻页动画应用到安卓上
                  })}
                />
                <Stack.Screen
                  name='FileScreen'
                  component={FileScreen}
                  options={({ route }) => ({
                    headerTitle: '文件',
                    gestureDirection: 'horizontal', // 手势的方向
                    gestureEnabled: true, // 启用安卓的手势返回
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS // 将ios翻页动画应用到安卓上
                  })}
                />
                <Stack.Screen
                  name='RecycleFileScreen'
                  component={RecycleFileScreen}
                  options={({ route }) => ({
                    headerTitle: isEdit ? getEditHeader(setEdit) : () => <Text style={{ marginLeft: 100, fontWeight: 'bold' }}>回收站</Text>,
                    headerLeft: recycleHeaderLeft(isEdit),
                    gestureDirection: 'horizontal', // 手势的方向
                    gestureEnabled: true, // 启用安卓的手势返回
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS // 将ios翻页动画应用到安卓上
                  })}
                />
                <Stack.Screen
                  name='AboutScreen'
                  component={AboutScreen}
                  options={({ route }) => ({
                    headerTitle: () => <Text style={{ marginLeft: 100, fontWeight: 'bold' }}>关于我们</Text>,
                    gestureDirection: 'horizontal', // 手势的方向
                    gestureEnabled: true, // 启用安卓的手势返回
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS // 将ios翻页动画应用到安卓上
                  })}
                />
              </Stack.Navigator>
            </Drawer>
          </Suspense>
        ) : (<Suspense fallback={<FullPageLoading></FullPageLoading>}>
          <Stack.Navigator mode={'modal'}>
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="RegisterScreen"
              component={RegisterScreen}
              options={{
                headerTitle: props => (<></>),
                gestureDirection: 'horizontal', // 手势的方向
                gestureEnabled: true, // 启用安卓的手势返回
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS // 将ios翻页动画应用到安卓上
              }}
            />
          </Stack.Navigator>
        </Suspense>
        )
      }
    </>
  )
};
