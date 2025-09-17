import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStaticNavigation } from '@react-navigation/native';
import CalendarScreen from '@app/screens/calendar/CalendarScreen.tsx';
import { MapStack } from '@app/navigations/MapNavigation.tsx';
import { FeedStack } from '@app/navigations/FeedNavigation.tsx';
import { colors } from '@app/constants/colors.ts';
import DrawerButton from '@app/components/DrawerButton.tsx';
import CustomDrawerContent from '@app/components/CustomDrawerContent.tsx';
import { DrawerIcons } from '@app/components/DrawerIcon.tsx';
import { MainDrawerParamList } from '@app/types/navigation.ts';

const DrawerNavigator = createDrawerNavigator({
  screenOptions: ({ route }) => {
    return {
      drawerStyle: {
        width: '60%',
        backgroundColor: colors.WHITE,
      },
      drawerLabelStyle: {
        fontWeight: '600',
      },
      drawerItemStyle: {
        borderRadius: 5,
      },
      drawerType: 'front',
      drawerActiveTintColor: colors.WHITE,
      drawerInactiveTintColor: colors.GRAY_500,
      drawerActiveBackgroundColor: colors.PINK_700,
      drawerInactiveBackgroundColor: colors.GRAY_100,
      drawerIcon: ({ focused }) =>
        DrawerIcons(route.name as keyof MainDrawerParamList, focused),
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
    };
  },
  screens: {
    Map: {
      screen: MapStack,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    Feed: {
      screen: FeedStack,
      options: {
        title: 'Feed',
        headerShown: false,
      },
    },
    Calendar: {
      screen: CalendarScreen,
      options: {
        title: 'Calendar',
        headerLeft: () => <DrawerButton />,
      },
    },
  },
  drawerContent: (props) => <CustomDrawerContent {...props} />,
});

const DrawerNavigation = createStaticNavigation(DrawerNavigator);

export default DrawerNavigation;
