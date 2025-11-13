import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App2 from './App2'
import App3 from './App3'
import App4 from './App4'
import App5 from './App5'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App5 />
  </StrictMode>,
)
