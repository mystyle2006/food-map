import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainDrawerParamList } from '@app/types/navigation';
import { useAuth } from '@app/hooks/useAuth';
import { baseUrls } from '@app/api/axios';
import { colors } from '../constants/colors';
import FastImage from 'react-native-fast-image';
import Config from 'react-native-config';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { auth } = useAuth();
  const navigation = useNavigation<StackNavigationProp<MainDrawerParamList>>();
  return (
    <SafeAreaView className="flex-1">
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{ gap: 5, marginTop: 30 }}
      >
        <Pressable className="items-center mb-[30px] gap-[5px]">
          <View className="w-[70px] h-[70px] rounded-[35px]">
            {auth.imageUri ? (
              <FastImage
                source={{
                  uri: `${Config.STORAGE_ENDPOINT}/storage/v1/object/public/food-map-upload/${auth.imageUri}`,
                }}
                style={{ width: '100%', height: '100%', borderRadius: 35 }}
              />
            ) : (
              <Image
                source={require('@app/assets/default-user.png')}
                resizeMode={'cover'}
                className="w-full h-full rounded-[35px]"
              />
            )}
          </View>
          <Text className="text-[14px]">{auth.nickname}</Text>
        </Pressable>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View className="flex-row justify-end p-5 border-t border-[#E7E7E7]">
        <Pressable
          className="flex-row items-center gap-[3px]"
          onPress={() => navigation.navigate('Setting')}
        >
          <Ionicons name="settings-outline" size={20} color={colors.BLACK} />
          <Text className="text-[15px]">Setting</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default CustomDrawerContent;
