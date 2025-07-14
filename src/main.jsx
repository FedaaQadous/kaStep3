import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer, toast } from 'react-toastify';
import { ThemeProvider} from '@emotion/react';
import ThemeContextProvider from './context/ThemeContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <>
   <ThemeContextProvider>
    <App />
    < ToastContainer/>
   </ThemeContextProvider>
    
    </>
    
 
,
)
