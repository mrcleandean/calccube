import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import CubeProvider from './components/CubeProvider.tsx'
import { Analytics } from "@vercel/analytics/react"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Analytics />
    <CubeProvider>
      <App />
    </CubeProvider>
  </React.StrictMode>,
)
