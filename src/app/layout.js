import { Inter } from 'next/font/google';
import { AOSInit } from '@/components/AOSInit';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mening Saytim',
  description: 'Next.js va AOS yordamida yaratilgan sayt',
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body className={inter.className}>
        {/* AOS animatsiyalarini faollashtirish */}
        <AOSInit />

        {/* Google Fonts linklari shu yerga tushadi */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" 
          rel="stylesheet" 
        />

  
        <main>{children}</main>
      </body>
    </html>
  );
}