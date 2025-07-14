import React from 'react'
import { RouterProvider } from 'react-router'
import routes from './routes'
import { QueryClient,QueryClientProvider,} from '@tanstack/react-query'
function App() {
  const queryClient = new QueryClient()

  return (
     <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
     </QueryClientProvider>
   
  )
}

export default App