import './global.css';

import React, { useEffect } from 'react';
import { RootNavigation } from '@app/navigations/RootNavigation';
import { GluestackUIProvider } from '@app/components/ui/gluestack-ui-provider';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@app/api/query-client';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BootSplash from 'react-native-bootsplash';

function App(): React.JSX.Element {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
      await new Promise((resolve) => setTimeout(resolve, 1000));
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

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
