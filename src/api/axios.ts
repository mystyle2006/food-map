import axios from 'axios';
import { Platform } from 'react-native';

export const baseUrls = {
  android: 'http://192.168.2.14:3030',
  ios: 'http://192.168.2.14:3030',
};

const axiosInstance = axios.create({
  baseURL: Platform.OS === 'android' ? baseUrls.android : baseUrls.ios,
});

export default axiosInstance;
