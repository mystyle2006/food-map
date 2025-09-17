import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

function DrawerButton() {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.openDrawer()}>
      <Text style={{ fontSize: 20 }}>Drawer</Text>
    </Pressable>
  );
}

export default DrawerButton;
