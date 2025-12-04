// ThemeContext.jsx
import React, { createContext, useContext, useState, useMemo } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const ThemeContext = createContext();
export const useThemeMode = () => useContext(ThemeContext);

export function ThemeModeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: darkMode ? "dark" : "light",
                    primary: { main: "#2b6cb0" }, // customize as needed
                    background: {
                        default: darkMode ? "#0b1220" : "#f5f7fa",
                        paper: darkMode ? "#0f1724" : "#fff",
                    },
                },
                shape: { borderRadius: 12 },
                components: {
                    MuiButton: {
                        defaultProps: { disableElevation: true },
                    },
                },
                typography: {
                    fontFamily: '"Inter", "Roboto", sans-serif',
                }
            }),
        [darkMode]
    );

    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}
