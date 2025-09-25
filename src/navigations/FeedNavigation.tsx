import { createStackNavigator } from '@react-navigation/stack';
import FeedListScreen from '@app/screens/feed/FeedListScreen';
import FeedDetailScreen from '@app/screens/feed/FeedDetailScreen';
import FeedFavoriteScreen from '@app/screens/feed/FeedFavoriteScreen';
import EditLocationScreen from '@app/screens/feed/EditLocationScreen';
import { colors } from '@app/constants/colors';
import DrawerButton from '@app/components/DrawerButton';
import ImageZoomScreen from '@app/screens/feed/ImageZoomScreen';
import { Pressable } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import React from 'react';

export const FeedStack = createStackNavigator({
  screenOptions: {
    headerTitleAlign: 'center',
    headerBackButtonDisplayMode: 'minimal',
    headerTintColor: colors.BLACK,
    headerStyle: {
      backgroundColor: colors.WHITE,
      shadowColor: colors.GRAY_500,
    },
    headerTitleStyle: {
      fontSize: 16,
    },
  },
  screens: {
    FeedList: {
      screen: FeedListScreen,
      options: ({ navigation }) => ({
        title: 'Feed',
        headerLeft: () => <DrawerButton />,
        headerRight: () => (
          <Pressable
            style={{ paddingHorizontal: 12 }}
            onPress={() => navigation.navigate('FeedFavorite')}
          >
            <Ionicons name="star" size={18} color={colors.RED_500} />
          </Pressable>
        ),
      }),
    },
    FeedDetail: {
      screen: FeedDetailScreen,
      options: {
        headerShown: false,
      },
    },
    FeedFavorite: {
      screen: FeedFavoriteScreen,
      options: ({ navigation }) => ({
        title: 'Favorite',
        headerLeft: () => (
          <Ionicons
            name="chevron-back"
            size={30}
            color={colors.BLACK}
            onPress={() => navigation.navigate('FeedList')}
          />
        ),
      }),
    },
    EditLocation: {
      screen: EditLocationScreen,
      options: {
        title: 'Edit Location',
        cardStyle: {
          backgroundColor: colors.WHITE,
        },
      },
    },
    ImageZoom: {
      screen: ImageZoomScreen,
      options: {
        headerShown: false,
      },
    },
  },
});
