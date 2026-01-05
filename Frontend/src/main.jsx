import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './Lib/reactQuery.js';
import { ClerkProviderWrapper } from './Auth/ClerkProviderWrapper.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <ClerkProviderWrapper>
      <BrowserRouter> 
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>  
      </BrowserRouter>
    </ClerkProviderWrapper>
)


