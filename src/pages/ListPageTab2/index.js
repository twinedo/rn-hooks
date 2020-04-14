import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

const ListPageTab2 = ({navigation}) => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex:1}}>
      <Text>ListPageTab2</Text>
      <Button
        title="Go To Empty"
        onPress={() => navigation.navigate('EmptyPage')}
      />
    </View>
  );
};

export default ListPageTab2;

const styles = StyleSheet.create({});
