import { ThemeProvider } from "@emotion/react";
import { Theme } from "../themes/Theme";
import { Box } from "@mui/material";

interface IThemeContext {
    children: React.ReactNode;
}

export const ThemeContext = ({children}: IThemeContext) => {
    const theme = Theme;
    return (
        <ThemeProvider theme={theme}>
                <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
                    {children}
                </Box>
        </ThemeProvider>
    )

}