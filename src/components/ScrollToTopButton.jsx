import React, { useEffect, useState } from "react";
import { Fab, Zoom, useTheme } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            const pageHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrolled / pageHeight) * 100;

            setVisible(scrollPercent > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Zoom in={visible}>
            <Fab
                onClick={scrollToTop}
                size="medium"
                aria-label="scroll back to top"
                sx={{
                    position: "fixed",
                    bottom: { xs: 20, md: 30 },
                    left: { xs: 20, md: 30 },      // LEFT SIDE
                    zIndex: 9998,
                    bgcolor: theme.palette.primary.main,
                    color: "#fff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    transition: "0.3s",
                    "&:hover": {
                        bgcolor: theme.palette.primary.dark,
                        boxShadow: "0 6px 16px rgba(0,0,0,0.4)",
                    }
                }}
            >
                <KeyboardArrowUpIcon />
            </Fab>
        </Zoom>
    );
}
