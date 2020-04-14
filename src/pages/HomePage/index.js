import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePageTab1 from '../HomePageTab1';
import HomePageTab2 from '../HomePageTab2';

const Tab = createBottomTabNavigator();



const HomePage = () => {
  return (
    <>
      <View
        style={{height: 40, alignItems: 'center', justifyContent: 'center'}}>
        <Text>HomePage</Text>
      </View>
      <Tab.Navigator>
        <Tab.Screen name="HomePageTab1" component={HomePageTab1} />
        <Tab.Screen name="HomePageTab2" component={HomePageTab2} />
      </Tab.Navigator>
    </>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
