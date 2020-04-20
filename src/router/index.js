import React, {useEffect, useState, useReducer, useMemo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  HomePage,
  ListPage,
  EmptyPage,
  DetailPage,
  Login,
  SplashScreen,
} from '../pages';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();
export const AuthContext = React.createContext();

const initialState = {
  isLoading: true,
  isSignOut: false,
  userToken: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isSignOut: false,
        userToken: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignOut: true,
        userToken: null,
      };
    default:
      return state;
  }
};

const Router = () => {
  const [isSigned, setIsSigned] = useState(null);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log('ini useEffect');
    CheckSignInStatus();
  }, []);

  const CheckSignInStatus = async () => {
    let value;

    try {
      value = await AsyncStorage.getItem('userToken');
      console.log(value);

    } catch (e) {
      // error reading value
    }
    dispatch({type: 'RESTORE_TOKEN', token: value});
  };

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({type: 'SIGN_IN', token: 'dummy_token'});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
          ) : state.userToken == null ? (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                title: 'Sign IN',
                animationTypeForReplace: state.isSignOut ? 'pop' : 'push',
              }}
            />
          ) : (
            <>
              <Stack.Screen
                name="HomePage"
                component={HomePage}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ListPage"
                component={ListPage}
                options={{headerShown: false}}
              />
              <Stack.Screen name="EmptyPage" component={EmptyPage} />
              <Stack.Screen name="DetailPage" component={DetailPage} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default Router;
