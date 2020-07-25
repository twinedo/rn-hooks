/* eslint-disable no-lone-blocks */
import React, {useContext, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../../router';

const SplashScreen = () => {
  const {restore_token} = useContext(AuthContext);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>SPLASH SCREEN</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
