import './global.css';

import React from 'react';
import { RootNavigation } from '@app/navigations/RootNavigation.tsx';
import { GluestackUIProvider } from '@app/components/ui/gluestack-ui-provider';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@app/api/query-client.ts';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider mode="light">
        <QueryClientProvider client={queryClient}>
          <RootNavigation />
        </QueryClientProvider>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}

export default App;
