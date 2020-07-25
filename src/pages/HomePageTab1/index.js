/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {NewsContext} from '../HomePage';

const HomePageTab1 = ({navigation}) => {
  return (
    <NewsContext.Consumer>
      {(data) => {
        console.log(data[0].urlToImage);
        return (
          <>
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
                onPress={() =>
                  navigation.navigate('ListPage', {
                    initialRouteName: 'UseReducerList',
                  })
                }>
                <Text style={{color: 'white'}}>Go To useReducer List</Text>
              </TouchableOpacity>
              <Image
                source={{uri: data[0].urlToImage}}
                style={{height: 200, width: 200}}
              />
            </View>
          </>
        );
      }}
    </NewsContext.Consumer>
  );
};

export default HomePageTab1;

const styles = StyleSheet.create({});
