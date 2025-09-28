import DrawerButton from '@app/components/DrawerButton';
import { colors } from '@app/constants/colors';
import SettingHomeScreen from '@app/screens/setting/SettingHomeScreen';
import EditProfileScreen from '@app/screens/setting/EditProfileScreen';
import { createStackNavigator } from '@react-navigation/stack';

export const SettingStack = createStackNavigator({
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
    SettingHome: {
      screen: SettingHomeScreen,
      options: {
        title: 'Setting',
        headerLeft: () => <DrawerButton />,
        cardStyle: {
          backgroundColor: colors.GRAY_100,
        },
      },
    },
    EditProfile: {
      screen: EditProfileScreen,
      options: {
        title: 'Edit Profile',
        cardStyle: {
          backgroundColor: colors.WHITE,
        },
      },
    },
  },
});
