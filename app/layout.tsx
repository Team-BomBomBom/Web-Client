import type { Metadata } from 'next';
import { Archivo, Libre_Franklin } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};
const libre_franklin = Libre_Franklin({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-libre_franklin',
})
const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
})
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={libre_franklin.variable + ' ' + archivo.variable}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
