import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App1.jsx'
import { App2 } from './App1.jsx' 
import { App3 } from './App1.jsx'
import { App4 } from './App1.jsx'
import { App5 } from './App1.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App />
    <App2 />
    <App3 />
    <App4 /> */}
    <App5/ >

  </StrictMode>,
)
