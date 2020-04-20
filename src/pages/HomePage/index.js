import React, {useState, useEffect, useReducer, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePageTab1 from '../HomePageTab1';
import HomePageTab2 from '../HomePageTab2';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

import {AuthContext} from '../../router';

const Tab = createBottomTabNavigator();
export const NewsContext = React.createContext();
export const NewsReducerContext = React.createContext();

const stateAwal = {
  loading: true,
  error: '',
  newsData: {},
};

const ngeReduce = (stateBaru, aksi) => {
  switch (aksi.type) {
    case 'FETCH_SUCCESS':
      return {
        loading: false,
        error: '',
        newsData: aksi.isiData,
      };
    case 'FETCH_ERROR':
      return {
        loading: false,
        error: 'Something went wrong',
        newsData: {},
      };
    default:
      return stateBaru;
  }
};

const HomePage = ({navigation}) => {
  const navi = useNavigation();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  const [stateBaru, manggilAksi] = useReducer(ngeReduce, stateAwal);

  const {signOut} = React.useContext(AuthContext);

  useEffect(() => {
    getNewsData();
    getTokenStorage();
  }, []);

  const getNewsData = () => {
    axios
      .get(
        'https://newsapi.org/v2/top-headlines?country=us&apiKey=a653300766444770bf4781451290bedf',
      )
      .then((response) => {
        setData(response.data.articles);
        // console.log(response);
        setLoading(false);

        manggilAksi({type: 'FETCH_SUCCESS', isiData: response.data.articles});
        // console.log(state.newsData);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);

        manggilAksi({type: 'FETCH_ERROR'});
      });
  };

  const getTokenStorage = async () => {
    let getToken;

    try {
      getToken = await AsyncStorage.getItem('token');
      setToken(getToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {stateBaru.loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <View
            style={{
              height: 40,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingHorizontal: 8,
            }}>
            <Text>HomePage</Text>
            <TouchableOpacity onPress={signOut}>
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text>Token kita: {token}</Text>
          </View>

          <NewsReducerContext.Provider value={stateBaru}>
            <NewsContext.Provider value={data}>
              <Tab.Navigator initialRouteName="HomePageTab2">
                <Tab.Screen name="HomePageTab1" component={HomePageTab1} />
                <Tab.Screen name="HomePageTab2" component={HomePageTab2} />
              </Tab.Navigator>
            </NewsContext.Provider>
          </NewsReducerContext.Provider>
        </>
      )}
    </>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
