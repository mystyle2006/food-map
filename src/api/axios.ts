import axios from 'axios';
import { Platform } from 'react-native';
import Config from 'react-native-config';

export const baseUrls = {
  android: Config.ANDROID_API_ENDPOINT,
  ios: Config.IOS_API_ENDPOINT,
};

const axiosInstance = axios.create({
  baseURL: Platform.OS === 'android' ? baseUrls.android : baseUrls.ios,
});

export default axiosInstance;
