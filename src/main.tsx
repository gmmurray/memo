import 'jotai-devtools/styles.css';

import App from './App.tsx';
import JotaiDevTools from './lib/jotai/JotaiDevTools.tsx';
import { Provider } from './lib/chakra-ui/provider.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <App />
      <JotaiDevTools />
    </Provider>
  </StrictMode>,
);
