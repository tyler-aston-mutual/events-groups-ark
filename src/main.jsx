import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import './design-system/tokens/fonts.css'
import { ThemeProvider } from './design-system/context/ThemeProvider'
import { JoinedProvider } from './context/JoinedContext'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultBrand="ark" defaultColorMode="light">
      <HashRouter>
        <JoinedProvider>
          <App />
        </JoinedProvider>
      </HashRouter>
    </ThemeProvider>
  </StrictMode>,
)
