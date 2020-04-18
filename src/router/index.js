import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {HomePage, ListPage, EmptyPage, DetailPage} from '../pages';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePageTab1 from '../pages/HomePageTab1';
import HomePageTab2 from '../pages/HomePageTab2';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

// const Home = () => {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="HomeTab1" component={HomePageTab1} />
//       <Tab.Screen name="HomeTab2" component={HomePageTab2} />
//     </Tab.Navigator>
//   );
// };

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{
          headerShown: false,
        }}
      />
      {/*<Stack.Screen
        name="HomeTab"
        component={Home}
        options={{
          headerShown: false,
        }}
      />*/}
      <Stack.Screen
        name="ListPage"
        component={ListPage}
        options={{headerShown: false}}
      />
      <Stack.Screen name="EmptyPage" component={EmptyPage} />
      <Stack.Screen name="DetailPage" component={DetailPage} />
    </Stack.Navigator>
  );
};

export default Router;
