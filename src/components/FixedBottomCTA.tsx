import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '@app/constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, ButtonText } from '@app/components/ui/button';

interface FixedBottomCTAProps {
  label: string;
  onPress: () => void;
}

function FixedBottomCTA({ label, onPress }: FixedBottomCTAProps) {
  const inset = useSafeAreaInsets();

  return (
    <View
      className={'absolute bottom-0 w-full pt-3 px-4 bg-white'}
      style={{
        paddingBottom: inset.bottom || 12,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.GRAY_300,
      }}
    >
      <Button className="w-full mt-2" size="md" onPress={onPress}>
        <ButtonText>{label}</ButtonText>
      </Button>
    </View>
  );
}

export default FixedBottomCTA;
