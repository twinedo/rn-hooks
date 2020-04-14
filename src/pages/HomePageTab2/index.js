/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const HomePageTab2 = ({navigation}) => {
  return (
    <View
      style={{
        backgroundColor: 'grey',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        style={{
          width: 200,
          height: 50,
          backgroundColor: 'blue',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('ListPage')}>
        <Text style={{color: 'white'}}>Go To useReducer List</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomePageTab2;

const styles = StyleSheet.create({});
