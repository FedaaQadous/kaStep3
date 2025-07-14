import {createTheme} from "@mui/material"

const theme = (mode)=> createTheme ({
    typography : {
        button :{
            fontSize :'15px'
        }
    } , 
     palette: {
    mode: mode,
}


})

export default theme ;