import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { ShelfProvider } from './context/ShelfContext.jsx'
import { QueryClient,QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

// this create client
const queryClient = new QueryClient({
  defaultOptions :{
    queries: {
      refetchOnWindowFocus: false,
      retry: 1, // this mean it will try again one time after failing to fetch
      staleTime: 5*60*1000, // this mean it will store fetehed data for 5min
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ShelfProvider>
          <App />
        </ShelfProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
)