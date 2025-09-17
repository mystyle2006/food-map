import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, Text } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { MainDrawerParamList } from '@app/types/navigation.ts';

type NavigationType = DrawerNavigationProp<MainDrawerParamList>;

function DrawerButton() {
  const navigation = useNavigation<NavigationType>();

  return (
    <Pressable onPress={() => navigation.openDrawer()}>
      <Text style={{ fontSize: 20 }}>Drawer</Text>
    </Pressable>
  );
}

export default DrawerButton;
