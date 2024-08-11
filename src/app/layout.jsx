import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from "./providers";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from '@//authservice/AuthContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CodAI Hub',
  description: 'Driven-ai templates projects fronts-end',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className='bg-transparent dark'>
      <body className={inter.className}>
        <Providers>
          <AuthContextProvider>
            {children}
          </AuthContextProvider>
        </Providers>
      </body>
    </html>
  )
}
