import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import React, { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { View, Text } from 'react-native';
import { Button, ButtonText } from '@app/components/ui/button';

function RetryErrorBoundary({ children }: PropsWithChildren) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <View className="flex-1 items-center justify-center gap-[10px] bg-white">
          <Text className="text-[18px] font-semibold text-black">
            Please try again later.
          </Text>
          <Text className="text-[15px] text-[#8E8E8E]">
            Failed to process the request.
          </Text>
          <Button onPress={resetErrorBoundary}>
            <ButtonText>Retry</ButtonText>
          </Button>
        </View>
      )}
    >
      {children}
    </ErrorBoundary>
  );
}

export default RetryErrorBoundary;
