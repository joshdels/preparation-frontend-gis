import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import App2 from './App2.jsx'
import App4 from './App4.jsx'
import App5 from './App5.jsx'
import App6 from './App6.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <App2 /> */}
    {/* <App4 /> */}
    {/* <App5 /> */}
    <AuthProvider>
      <App6 />
    </AuthProvider>

  </StrictMode>,
)
