import { createTheme } from '@mui/material/styles'


const PRIMARY = '#0b3256' // TDTU inspired deep blue
const ACCENT = '#ff6f00' // warm accent


const theme = createTheme({
    palette: {
        primary: { main: PRIMARY },
        secondary: { main: ACCENT },
        background: { default: '#f5f7fb' }
    },
    typography: {
        fontFamily: 'Inter, Roboto, Arial'
    }
})


export default theme