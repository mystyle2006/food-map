declare module 'react-native-config' {
  export interface NativeConfig {
    GOOGLE_MAP_API_KEY?: string;
    STORAGE_ENDPOINT?: string;
    IOS_API_ENDPOINT?: string;
    ANDROID_API_ENDPOINT?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
