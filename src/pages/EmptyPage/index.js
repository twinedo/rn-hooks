import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const EmptyPage = ({navigation}) => {
  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>EmptyPage</Text>
      <TouchableOpacity onPress={() => navigation.navigate('DetailPage')}>
        <Text>Go To Detail</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyPage;

const styles = StyleSheet.create({});
