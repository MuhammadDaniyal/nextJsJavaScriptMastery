import "@styles/globals.css";
import Navbar from '@components/Navbar'
import Provider from '@components/Provider'

export const metadata = {
  title: 'Promptopia',
  description: 'Discover and Share AI Prompts',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <div className="app">
            <Navbar />
            {children}
          </div>
        </Provider>
      </body>
    </html>
  )
}
