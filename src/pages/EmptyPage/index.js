import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import DetailPage from '../DetailPage';

export const CreateContext = React.createContext();

const EmptyPage = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>EmptyPage</Text>
      <TouchableOpacity onPress={() => navigation.navigate('DetailPage')}>
        <Text>Go To Detail</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ListPage', {
            initialRouteName: 'UseStateList',
          })
        }>
        <Text>Go To ListPage</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyPage;

const styles = StyleSheet.create({});
