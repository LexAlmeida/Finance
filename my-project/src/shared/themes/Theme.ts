import { createTheme } from "@mui/material";

export const Theme = createTheme({
    palette: {
        primary:{
            main: '#00875f',
            dark: '#015f43',
            light: '#00b37e',
            contrastText: '#ffffff'
        },
        secondary: {
            main: '#f75a68',
            dark: '#aa2834',
            contrastText: '#ffffff'
        },
        background: {
            default: '#202024',
            paper: '#323238'
        },
        text: {
            primary: '#c4c4cc',
            secondary: '#e1e1e6'
        }
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiFilledInput-root": {
                        backgroundColor: '#121214',
                        
                    }
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#c4c4cc'
                }
            }
        }
    }
})