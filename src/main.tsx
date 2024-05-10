import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import CubeProvider from './components/CubeProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CubeProvider>
      <App />
    </CubeProvider>
  </React.StrictMode>,
)
