import React from 'react';

interface AppContext {
  hasLoadedOnce: boolean;
}

export default React.createContext<AppContext>({
  hasLoadedOnce: false,
});
