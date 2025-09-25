import { createStackNavigator } from '@react-navigation/stack';
import FeedListScreen from '@app/screens/feed/FeedListScreen';
import FeedDetailScreen from '@app/screens/feed/FeedDetailScreen';
import FeedFavoriteScreen from '@app/screens/feed/FeedFavoriteScreen';
import EditLocationScreen from '@app/screens/feed/EditLocationScreen';
import { colors } from '@app/constants/colors';
import DrawerButton from '@app/components/DrawerButton';
import ImageZoomScreen from '@app/screens/feed/ImageZoomScreen';

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
      options: {
        title: 'Feed',
        headerLeft: () => <DrawerButton />,
      },
    },
    FeedDetail: {
      screen: FeedDetailScreen,
      options: {
        headerShown: false,
      },
    },
    FeedFavorite: {
      screen: FeedFavoriteScreen,
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
