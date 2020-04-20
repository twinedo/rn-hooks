import axios from 'axios';
import base64 from 'react-native-base64';

const authHeader =
  'Basic ' + base64.encode(`${'truckingclient'}:${'12345678'}`);
export default axios.create({
  baseURL: 'http://167.71.192.220:9050',
  headers: {
    // 'Content-Type': 'application/json',
    Authorization: authHeader,
    Accept: 'application/json',
  },
});
