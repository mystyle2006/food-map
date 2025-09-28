import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import SettingItem from '@app/components/setting/SettingItem';
import { SettingStackParamList } from '@app/types/navigation';
import { colors } from '@app/constants/colors';
import { useAuth } from '@app/hooks/useAuth';

type Navigation = NavigationProp<SettingStackParamList>;

function SettingHomeScreen() {
  const navigation = useNavigation<Navigation>();
  const { logoutMutation } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.space} />
        <SettingItem
          title="Edit Profile"
          onPress={() => navigation.navigate('EditProfile')}
        />
        <SettingItem
          title="Sign out"
          color={colors.RED_500}
          onPress={() => logoutMutation.mutate(null)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  space: {
    height: 30,
  },
});

export default SettingHomeScreen;
