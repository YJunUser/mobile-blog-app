import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CardStyleInterpolators, createStackNavigator, } from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Drawer } from './components/drawer';
import { ListScreen } from './page/list';
import { getHeaderTitle } from './utils/header';
import { useAuth } from './context/auth-context';
import { Suspense } from 'react';

import FullPageLoading from './components/FullPageLoading';

// lazy components
const HomeScreen = React.lazy(() => import('./page/home/index'))
const LoginScreen = React.lazy(() => import('./page/unauth/login'))
const RegisterScreen = React.lazy(() => import('./page/unauth/register'))
const ProfileScreen = React.lazy(() => import('./page/profile/index'))

// Tab-bar Screen
const BottomTab = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;
          if (route.name === 'HomeScreen') {
            iconName = focused ? 'file-text' : 'file-text';
          } else if (route.name === 'ListScreen') {
            iconName = focused ? 'search' : 'search';
          }
          // You can return any component that you like here!
          return <Icon name={iconName || ''} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="ListScreen" component={ListScreen} />
    </Tab.Navigator>
  );
};



// Main 
const Stack = createStackNavigator(

);

export const AndroidApp = () => {
  const { user } = useAuth()
  return (
    <>
      {
        user ? (
          <Suspense fallback={<FullPageLoading></FullPageLoading>}>
            <Drawer>
              <Stack.Navigator>
                <Stack.Screen
                  name="TabScreen"
                  component={BottomTab}
                  options={({ route }) => ({
                    headerTitle: getHeaderTitle(route),
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
              </Stack.Navigator>
            </Drawer>
          </Suspense>
        ) : (<Suspense fallback={FullPageLoading}>
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
