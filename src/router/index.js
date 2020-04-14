import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {HomePage, ListPage, EmptyPage, DetailPage} from '../pages';

const Stack = createStackNavigator();

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
