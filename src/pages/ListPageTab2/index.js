import React from 'react';
import {StyleSheet, Text, View, Button, Image, Alert} from 'react-native';
import Slider from 'react-native-slide-to-unlock';
import SwipeButton from 'rn-swipe-button';
import arrowRight from '../../assets/Logo.png';

const ListPageTab2 = ({navigation}) => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <Text>ListPageTab2</Text>
      <Button
        title="Go To Empty"
        onPress={() => navigation.navigate('EmptyPage')}
      />
      <SwipeButton
        thumbIconImageSource={arrowRight}
        width="100%"
        railStyles={{borderColor: 'red'}}
        swipeSuccessThreshold={100}
        onSwipeSuccess={() => alert('Submitted successfully!')}
      />
    </View>
  );
};

export default ListPageTab2;

const styles = StyleSheet.create({});
