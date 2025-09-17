import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStaticNavigation } from '@react-navigation/native';
import MapHomeScreen from '@app/screens/map/MapHomeScreen';
import CalendarScreen from '@app/screens/calendar/CalendarScreen.tsx';
import FeedListScreen from '@app/screens/feed/FeedScreen.tsx';

const DrawerNavigator = createDrawerNavigator({
  screens: {
    Map: MapHomeScreen,
    Feed: FeedListScreen,
    Calendar: CalendarScreen,
  },
});

const DrawerNavigation = createStaticNavigation(DrawerNavigator);

export default DrawerNavigation;
