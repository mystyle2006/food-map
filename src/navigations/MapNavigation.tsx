import { createStackNavigator } from '@react-navigation/stack';
import MapHomeScreen from '@app/screens/map/MapHomeScreen';
import AddLocationScreen from '@app/screens/map/AddLocationScreen';
import { colors } from '@app/constants/colors';
import SearchLocationScreen from '@app/screens/map/SearchLocationScreen';

export const MapStack = createStackNavigator({
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
    MapHome: {
      screen: MapHomeScreen,
      options: {
        headerShown: false,
      },
    },
    AddLocation: {
      screen: AddLocationScreen,
      options: {
        title: 'Add location',
        cardStyle: {
          backgroundColor: colors.WHITE,
        },
      },
    },
    SearchLocation: {
      screen: SearchLocationScreen,
      options: {
        title: 'Search',
        presentation: 'modal',
        cardStyle: {
          backgroundColor: colors.WHITE,
        },
      },
    },
  },
});
