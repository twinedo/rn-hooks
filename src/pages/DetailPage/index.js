import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NewsContext} from '../HomePage';
import AsyncStorage from '@react-native-community/async-storage';

const DetailPage = () => {
  const [news, setNews] = useState('');

  useEffect(() => {
    getData();
  }, [news]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('newsData');
      if (value !== null) {
        // value previously stored
        console.log(value);
        setNews(value.articles);
      }
    } catch (e) {
      // error reading value
    }
  };

  return (
    <View>
      <Text>{news}</Text>
    </View>
  );
};

export default DetailPage;

const styles = StyleSheet.create({});
