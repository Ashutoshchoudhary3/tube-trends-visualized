import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // <-- Import this
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Add the router here */}
    <BrowserRouter basename="/tube-trends-visualized/">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)