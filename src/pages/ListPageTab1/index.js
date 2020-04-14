import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

const ListPageTab1 = ({navigation}) => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <Text>ListPageTab1</Text>
      <Button
        title="Go To Empty"
        onPress={() => navigation.navigate('EmptyPage')}
      />
    </View>
  );
};

export default ListPageTab1;

const styles = StyleSheet.create({});
