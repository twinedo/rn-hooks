import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import Router from './src/router';
import NewsContext from './src/pages/HomePage';

const App = () => {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
