import './global.css';

import React from 'react';
import { RootNavigation } from '@app/navigations/RootNavigation.tsx';

import { GluestackUIProvider } from '@app/components/ui/gluestack-ui-provider';

function App(): React.JSX.Element {
  return (
    <GluestackUIProvider mode="light">
      <>
        <RootNavigation />
      </>
    </GluestackUIProvider>
  );
}

export default App;
