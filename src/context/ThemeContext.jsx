import { ThemeProvider } from "@emotion/react";
import {  createContext, useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme/Index.jsx'

export const ThemeContext= createContext(null);

const ThemeContextProvider =({children}) =>{
    const [mode , setMode]= useState('light');
    const currentTheme = theme(mode);

    const toggleTheme=  () =>{
        setMode ((prev ) =>(prev == 'light' ?'dark' : 'light'));
    }
    return <ThemeContext.Provider value={{mode , toggleTheme}}>
        <ThemeProvider theme={currentTheme}>
        <CssBaseline/>
        {children}
        </ThemeProvider>
    </ThemeContext.Provider>
}

export default ThemeContextProvider;