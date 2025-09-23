import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { MainDrawerParamList } from '@app/types/navigation';
import { colors } from '@app/constants/colors';

type DrawerIconName = 'map' | 'book' | 'calendar';

export const DrawerIcons = (
  routeName: keyof MainDrawerParamList,
  focused: boolean,
) => {
  let iconName: DrawerIconName;

  switch (routeName) {
    case 'Map': {
      iconName = 'map';
      break;
    }
    case 'Feed': {
      iconName = 'book';
      break;
    }
    case 'Calendar': {
      iconName = 'calendar';
      break;
    }
  }

  return (
    <FontAwesome6
      name={iconName}
      iconStyle="solid"
      size={20}
      color={focused ? colors.WHITE : colors.GRAY_300}
    />
  );
};
