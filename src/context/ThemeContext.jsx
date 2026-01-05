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

                    // ⭐ MAKE ALL <a> WHITE IN DARK MODE
                    MuiLink: {
                        styleOverrides: {
                            root: ({ theme }) => ({
                                color: theme.palette.mode === "dark" ? "#fff" : "#1565c0",
                                textDecoration: "none",

                                "&:hover": {
                                    color: theme.palette.mode === "dark" ? "#90caf9" : "#0d47a1",
                                }
                            }),
                        },
                    },

                    // ⭐ ALSO APPLY TO RAW <a> TAGS INSIDE CKEditor OR HTML CONTENT
                    MuiCssBaseline: {
                        styleOverrides: (theme) => ({
                            a: {
                                color: theme.palette.mode === "dark" ? "#fff" : "#1565c0",
                                textDecoration: "none",
                                transition: "0.2s",
                                "&:hover": {
                                    color: theme.palette.mode === "dark" ? "#90caf9" : "#0d47a1",
                                },
                            },

                            /* ✅ RAW HTML TABLE (CKEditor / dangerouslySetInnerHTML) */
                            ".rich-content table": {
                                width: "100%",
                                borderCollapse: "collapse",
                                backgroundColor: theme.palette.mode === "dark" ? "#0f1724" : "#ffffff",
                                color: theme.palette.mode === "dark" ? "#e5e7eb" : "#111827",
                                border:
                                    theme.palette.mode === "dark"
                                        ? "1px solid rgba(255,255,255,0.12)"
                                        : "1px solid #111827",
                            },

                            ".rich-content th, .rich-content td": {
                                padding: "12px 14px",
                                verticalAlign: "top",
                                border:
                                    theme.palette.mode === "dark"
                                        ? "1px solid rgba(255,255,255,0.12) !important"
                                        : "1px solid #111827 !important",
                                borderColor:
                                    theme.palette.mode === "dark"
                                        ? "rgba(255,255,255,0.12) !important"
                                        : "#111827 !important",
                            },

                            ".rich-content th": {
                                fontWeight: 700,
                                backgroundColor: theme.palette.mode === "dark" ? "#111b2d" : "#f3f4f6",
                            },

                            ".rich-content tr:nth-of-type(even)": {
                                backgroundColor: theme.palette.mode === "dark"
                                    ? "rgba(255,255,255,0.02)"
                                    : "#fafafa",
                            },

                            ".rich-content tr:hover": {
                                backgroundColor: theme.palette.mode === "dark"
                                    ? "rgba(255,255,255,0.05)"
                                    : "#f5f5f5",
                            },
                        }),
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
