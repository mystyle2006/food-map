import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { MainDrawerParamList } from '@app/types/navigation';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '@app/constants/colors';

type NavigationType = DrawerNavigationProp<MainDrawerParamList>;

interface DrawerButtonProps {
  color?: string;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

function DrawerButton({
  color = colors.BLACK,
  style = '',
  className = '',
}: DrawerButtonProps) {
  const navigation = useNavigation<NavigationType>();

  return (
    <Pressable
      className={className}
      style={[style, styles.container]}
      onPress={() => navigation.openDrawer()}
    >
      <Ionicons name="menu" size={25} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
});

export default DrawerButton;
