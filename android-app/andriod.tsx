import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Drawer} from './components/drawer';
import {HomeScreen} from './page/home';
import {ListScreen} from './page/list';
import {useState} from 'react';

const BottomTab = (): JSX.Element => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'hand-o-right' : 'hand-o-left';
          } else if (route.name === 'List') {
            iconName = focused ? 'thumbs-o-up' : 'thumbs-o-down';
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

const LogoTitle = ({setOpen}: {setOpen: (isOpen: boolean) => void}) => {
  return (
    <View style={{}}>
      <Pressable onPress={() => setOpen((isOpen: boolean) => !isOpen)}>
        <Text>
          <Icon name={'user-circle-o'} size={30} color={'gray'} />
        </Text>
      </Pressable>
    </View>
  );
};
const Stack = createStackNavigator();

export const AndroidApp = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <Drawer isOpen={isOpen}>
      <Stack.Navigator>
        <Stack.Screen
          name="Tab"
          component={BottomTab}
          options={{
            headerTitle: () => <LogoTitle setOpen={setOpen} />,
          }}
        />
      </Stack.Navigator>
    </Drawer>
  );
};

const styles = StyleSheet.create({
  title: {},
});
