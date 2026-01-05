import { AppBar, Toolbar, Box, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const menus = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Post", path: "/dashboard/posts" },
  { label: "Pages", path: "/dashboard/pages" },
  { label: "Media", path: "/dashboard/medias" },
  { label: "People", path: "/dashboard/users" },
  { label: "Help", path: "/help" },
];

export default function DashNav() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return null; // 🔥 CHỈ HIỆN KHI LOGIN

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#1f2937", // dark admin bar
        color: "#fff",
        height: 33,
        justifyContent: "center",
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          minHeight: 33,
          px: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* LEFT MENU */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {menus.map((m) => (
            <Button
              key={m.label}
              component={Link}
              to={m.path}
              size="small"
              sx={{
                color: "#e5e7eb",
                textTransform: "none",
                fontSize: 13,
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              {m.label}
            </Button>
          ))}
        </Box>

        {/* RIGHT USER */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography fontSize={13}>
            Hello <b>{user.username || user.name}</b>
          </Typography>

          <Button
            size="small"
            onClick={logout}
            sx={{
              color: "#fca5a5",
              textTransform: "none",
              fontSize: 13,
            }}
          >
            Log out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
