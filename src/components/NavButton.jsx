import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function NavButton({ to, children }) {
    return (
        <Button
            component={RouterLink}
            to={to}
            color="inherit"
            sx={{
                textTransform: "none",
                fontSize: "16px",
                fontWeight: 500,
                px: 1.5,
                "&:hover": {
                    bgcolor: "action.hover",
                },
            }}
        >
            {children}
        </Button>
    );
}
