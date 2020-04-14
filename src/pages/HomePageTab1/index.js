import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const HomePageTab1 = ({navigation}) => {
  return (
    <View
      style={{
        backgroundColor: 'lightblue',
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
        <Text style={{color: 'white'}}>Go To useState List</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomePageTab1;

const styles = StyleSheet.create({});
