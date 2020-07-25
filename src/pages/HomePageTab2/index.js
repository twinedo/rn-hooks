/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {NewsReducerContext} from '../HomePage';

const HomePageTab2 = ({navigation}) => {
  return (
    <NewsReducerContext.Consumer>
      {(state) => {
        console.log(state);
        return (
          <>
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
                onPress={() =>
                  navigation.navigate('ListPage', {
                    initialRouteName: 'UseStateList',
                  })
                }>
                <Text style={{color: 'white'}}>Go To useState List</Text>
              </TouchableOpacity>
              <Image
                source={{uri: state.newsData[3].urlToImage}}
                style={{height: 200, width: 200}}
              />
            </View>
          </>
        );
      }}
    </NewsReducerContext.Consumer>
  );
};

export default HomePageTab2;

const styles = StyleSheet.create({});
