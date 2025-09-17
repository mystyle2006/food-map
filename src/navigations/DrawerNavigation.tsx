import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStaticNavigation } from '@react-navigation/native';
import CalendarScreen from '@app/screens/calendar/CalendarScreen.tsx';
import { MapStack } from '@app/navigations/MapNavigation.tsx';
import { FeedStack } from '@app/navigations/FeedNavigation.tsx';

const DrawerNavigator = createDrawerNavigator({
  screens: {
    Map: {
      screen: MapStack,
    },
    Feed: {
      screen: FeedStack,
    },
    Calendar: {
      screen: CalendarScreen,
    },
  },
});

const DrawerNavigation = createStaticNavigation(DrawerNavigator);

export default DrawerNavigation;
