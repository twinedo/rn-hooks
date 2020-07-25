import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {AuthContext} from '../../router';
import {DataSignInContext} from '../../router';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('tanaka.yogi@yahoo.com');
  const [password, setPassword] = useState('12345678');

  const {signIn} = useContext(AuthContext);

  const contextValue = useContext(DataSignInContext);
  console.log(contextValue);

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={() => signIn({username, password})} />
      {contextValue.error ? (
        <Text style={styles.error}>{contextValue.error}</Text>
      ) : null}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  error: {
    color: 'red',
  }
});
