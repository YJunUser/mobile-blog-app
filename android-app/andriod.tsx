import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CardStyleInterpolators, createStackNavigator, } from '@react-navigation/stack';
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Drawer } from './components/drawer';
import { HomeScreen } from './page/home';
import { ListScreen } from './page/list';
import { getHeaderTitle } from './utils/header';
import { useAuth } from './context/auth-context';
import { LoginScreen } from './page/unauth/login';
import { RegisterScreen } from './page/unauth/register';



// Tab-bar Screen
const BottomTab = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;
          if (route.name === 'Home') {
            iconName = focused ? 'file-text' : 'file-text';
          } else if (route.name === 'List') {
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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="List" component={ListScreen} />
    </Tab.Navigator>
  );
};

const Detail = () => {
  return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Detail</Text>
  </View>
}



// Main 
const Stack = createStackNavigator(
);

export const AndroidApp = () => {
  const { user } = useAuth()

  return (
    <>
      {
        user ? (<Drawer>
          <Stack.Navigator>
            <Stack.Screen
              name="Tab"
              component={BottomTab}
              options={({ route }) => ({
                headerTitle: getHeaderTitle(route),
              })}
            />
            <Stack.Screen
              name='Detail'
              component={Detail}
              options={{
                gestureDirection: 'horizontal', // 手势的方向
                gestureEnabled: true, // 启用安卓的手势返回
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS // 将ios翻页动画应用到安卓上
              }}
            />
          </Stack.Navigator>
        </Drawer>
        ) : (<Stack.Navigator mode={'modal'}>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              headerTitle: props => (<></>),
              gestureDirection: 'horizontal', // 手势的方向
              gestureEnabled: true, // 启用安卓的手势返回
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS // 将ios翻页动画应用到安卓上
            }}
          />
        </Stack.Navigator>
        )
      }
    </>
  )
};
