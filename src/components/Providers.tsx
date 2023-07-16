'use client'

import { FC } from 'react'
import { ThemeProvider } from 'next-themes'
import {
    QueryClient,
    QueryClientProvider,
    
} from '@tanstack/react-query'
const queryClient = new QueryClient()

interface ProvidersProps { children: React.ReactNode }

const Providers: FC<ProvidersProps> = ({ children }) => {
    return <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" enableSystem={false} defaultTheme='dark'>
            {children}
        </ThemeProvider>

    </QueryClientProvider>
}

export default Providers