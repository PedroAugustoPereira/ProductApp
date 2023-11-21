import React from 'react';

import ReactDOM from 'react-dom/client';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import App from './App.tsx';
import AosComponent from './components/common/aos.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AosComponent />
    <App />
  </QueryClientProvider>
);
