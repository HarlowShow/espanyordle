import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import Header from "./components/nav/header.jsx";
import UIProvider from './context/UIProvider';

const inter = Inter({ subsets: ["latin"], display: 'swap' });
const roboto = Roboto({ weight: '400', subsets: ["latin"] })

export const metadata = {
  title: "Españordle",
  description: "A daily word game for spanish learners",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1
}

export default function RootLayout({ children }) {
  return (
        <UIProvider>
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div>
        </div>
        <main className="main">{children}</main>
      </body>
    </html>
        </UIProvider>
  );
}
