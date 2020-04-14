import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ListPageTab1 from '../ListPageTab1';
import ListPageTab2 from '../ListPageTab2';

const Tab = createMaterialTopTabNavigator();

const ListPage = ({navigation}) => {
  return (
    <>
      <View style={{height: 40, alignItems: 'center', flexDirection: 'row'}}>
        <TouchableOpacity
          style={{marginHorizontal: 8}}
          onPress={() => navigation.goBack()}>
          <Text>Back </Text>
        </TouchableOpacity>
        <Text>ListPage</Text>
      </View>
      <Tab.Navigator>
        <Tab.Screen name="UseStateList" component={ListPageTab1} />
        <Tab.Screen name="UseReducerList" component={ListPageTab2} />
      </Tab.Navigator>
    </>
  );
};

export default ListPage;

const styles = StyleSheet.create({});
