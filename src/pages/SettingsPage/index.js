import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const SettingsPage = () => {
  return (
    <View>
      <Button
        title="English"
        onPress={() => AsyncStorage.setItem('translate', 'en')}
      />
      <View style={{height: 20}} />
      <Button
        title="Indonesia"
        onPress={() => AsyncStorage.setItem('translate', 'id')}
      />
    </View>
  );
};

export default SettingsPage;

const styles = StyleSheet.create({});
