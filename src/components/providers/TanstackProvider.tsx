// app/providers.jsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import  { ReactNode, useState } from 'react'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
export default function TanstackProviders({ children }:{children: ReactNode}) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}
    <ReactQueryDevtools/>
    </QueryClientProvider>
  )
}