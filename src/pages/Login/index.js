import React from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {AuthContext} from '../../router';

const Login = ({navigation}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {signIn} = React.useContext(AuthContext);

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
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
