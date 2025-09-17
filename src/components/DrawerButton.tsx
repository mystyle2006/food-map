import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { MainDrawerParamList } from '@app/types/navigation.ts';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '@app/constants/colors.ts';

type NavigationType = DrawerNavigationProp<MainDrawerParamList>;

function DrawerButton({ color = colors.BLACK }) {
  const navigation = useNavigation<NavigationType>();

  return (
    <Pressable style={styles.container} onPress={() => navigation.openDrawer()}>
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
