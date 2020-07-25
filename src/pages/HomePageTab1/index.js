/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import {NewsContext} from '../HomePage';
import {useTranslation} from 'react-i18next';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const HomePageTab1 = ({navigation}) => {
  const {t, i18n} = useTranslation();

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('translate').then((res) => {
        if (res) {
          i18n.changeLanguage(res);
        } else {
          i18n.changeLanguage('id');
        }
      });
      return () => console.log('djanwdjb');
    }, [i18n]),
  );

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
              <Text>{data[0].title}</Text>
              <Text>{t('welcome')}</Text>
            </View>
          </>
        );
      }}
    </NewsContext.Consumer>
  );
};

export default HomePageTab1;

const styles = StyleSheet.create({});
