import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  InteractionManager,
  ActivityIndicator,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ListPageTab1 from '../ListPageTab1';
import ListPageTab2 from '../ListPageTab2';
import {useFocusEffect} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const ListPage = ({route, navigation}) => {
  const {initialRouteName} = route.params;

  const [initialRoute, setInitialRoute] = useState(initialRouteName);
  const [loading, setLoading] = useState(false);

  console.log(initialRouteName);
  // setInitialRoute(initialRouteName);

  useFocusEffect(
    React.useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        // Expensive task
        setInitialRoute(initialRouteName);
        setTimeout(() => {
          setLoading(true);
        }, 1500);
      });
      return () => task.cancel();
    }, [initialRouteName]),
  );

  // useEffect(() => {
  //   setInitialRoute(initialRouteName);
  //   return () => {
  //     console.log('unmount');
  //   };
  // }, [initialRouteName]);

  return (
    <>
      {loading ? (
        <>
          <View
            style={{height: 40, alignItems: 'center', flexDirection: 'row'}}>
            <TouchableOpacity
              style={{marginHorizontal: 8}}
              onPress={() => navigation.goBack()}>
              <Text>Back </Text>
            </TouchableOpacity>
            <Text>ListPage</Text>
            <Text>{initialRoute}</Text>
          </View>
          <Tab.Navigator initialRouteName={initialRouteName}>
            <Tab.Screen name="UseStateList" component={ListPageTab1} />
            <Tab.Screen name="UseReducerList" component={ListPageTab2} />
          </Tab.Navigator>
        </>
      ) : (
        <>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="blue" />
            <Text>Loading</Text>
          </View>
        </>
      )}
    </>
  );
};

export default ListPage;

const styles = StyleSheet.create({});
