import { useState, useEffect, useRef } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Tooltip,
  Menu,
  MenuItem,
  Paper,
  Stack,
  CircularProgress,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import PeopleIcon from "@mui/icons-material/People";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import FeedIcon from "@mui/icons-material/Feed";
import useLogout from "../hooks/useLogout";

import Logo from "../assets/image/logo.jpg";

/* ================= CONSTANTS ================= */
const SIDEBAR_EXPANDED = 240;
const SIDEBAR_COLLAPSED = 80;


const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { label: "Users", path: "/dashboard/users", icon: <PeopleIcon /> },
  { label: "Pages", path: "/dashboard/pages", icon: <DescriptionIcon /> },
  { label: "Posts", path: "/dashboard/posts", icon: <ArticleIcon /> },
  { label: "Medias", path: "/dashboard/medias", icon: <PermMediaIcon /> },
  { label: "Result Form", path: "/dashboard/forms", icon: <PermMediaIcon /> },
  { label: "Văn Bản", path: "/dashboard/vanban", icon: <FeedIcon /> },
  { label: "Trend Books", path: "/dashboard/trend-books", icon: <FeedIcon /> },
];

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const logout = useLogout();
  const [anchorEl, setAnchorEl] = useState(null);

  const totalRef = useRef(null);
  const todayRef = useRef(null);
  const onlineRef = useRef(null);

  const histatsScripts = [
    { id: "total", ref: totalRef, code: "00011111" },
    { id: "today", ref: todayRef, code: "00000110" },
    { id: "online", ref: onlineRef, code: "00000001" },
  ];

  useEffect(() => {
    if (location.pathname !== "/dashboard") return;

    histatsScripts.forEach(({ ref, code }) => {
      if (!ref.current) return;

      // Clear previous script if any
      ref.current.innerHTML = "";

      // Create script element
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        var _Hasync = _Hasync || [];
        _Hasync.push(['Histats.start', '1,5001419,4,138,112,33,${code}']);
        _Hasync.push(['Histats.fasi', '1']);
        _Hasync.push(['Histats.track_hits', '']);
      `;
      ref.current.appendChild(script);

      // Append external Histats JS only once
      if (!document.getElementById("histats-js")) {
        const hsJs = document.createElement("script");
        hsJs.id = "histats-js";
        hsJs.type = "text/javascript";
        hsJs.async = true;
        hsJs.src = "//s10.histats.com/js15_as.js";
        document.body.appendChild(hsJs);
      }
    });

  }, [location.pathname]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        bgcolor: "#f5f5f7",
        overflow: "hidden",
      }}
    >
      {/* ================= SIDEBAR ================= */}
      <Drawer
        variant="permanent"
        sx={{
          width: open ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED,
            transition: "width 0.25s ease",
            overflowX: "hidden",
            borderRight: "1px solid #e5e7eb",
            bgcolor: "#ffffff",
          },
        }}
      >
        <Toolbar
          sx={{
            justifyContent: open ? "space-between" : "center",
            px: 2,
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          {open && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <img src={Logo} alt="logo" style={{ height: 28 }} />
              <Typography fontWeight={800}>Admin</Typography>
            </Box>
          )}
          <IconButton onClick={() => setOpen(!open)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>

        <List sx={{ mt: 1 }}>
          {menuItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Tooltip
                key={item.path}
                title={!open ? item.label : ""}
                placement="right"
                arrow
              >
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    mx: open ? 1 : "auto",
                    my: 0.5,
                    width: open ? "auto" : 56,
                    borderRadius: 2,
                    justifyContent: open ? "flex-start" : "center",
                    bgcolor: active ? "primary.main" : "transparent",
                    color: active ? "#fff" : "#374151",
                    "&:hover": {
                      bgcolor: active ? "primary.dark" : "#f3f4f6",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: open ? 40 : 0,
                      color: active ? "#fff" : "#6b7280",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  {open && (
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: active ? 700 : 500,
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            );
          })}
        </List>
      </Drawer>

      {/* ================= MAIN ================= */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        {/* TOPBAR */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: "#ffffff",
            color: "#111827",
            borderBottom: "1px solid #e5e7eb",
            zIndex: 1100,
          }}
        >
          <Toolbar>
            <IconButton
              onClick={() => setOpen(!open)}
              sx={{ mr: 2, display: { lg: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Typography fontWeight={700}>
              {menuItems.find((m) => m.path === location.pathname)?.label ||
                "Dashboard"}
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <Box
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Typography
                fontSize={14}
                sx={{ "&:hover": { textDecoration: "underline" } }}
              >
                View Website
              </Typography>
            </Box>

            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <AccountCircleIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  logout();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* PAGE CONTENT */}
        <Box
          key={open ? "expanded" : "collapsed"}
          sx={{
            p: 3,
            flexGrow: 1,
            overflow: "auto",
            minWidth: 0,
          }}
        >
          {location.pathname === "/dashboard" && (
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 2 }}>
              <Paper sx={{ p: 2, flex: 1, borderRadius: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Visits (Total)
                </Typography>
                <Box ref={totalRef} id="histats_total"></Box>
              </Paper>

              <Paper sx={{ p: 2, flex: 1, borderRadius: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Visits (Today)
                </Typography>
                <Box ref={todayRef} id="histats_today"></Box>
              </Paper>

              <Paper sx={{ p: 2, flex: 1, borderRadius: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Online
                </Typography>
                <Box ref={onlineRef} id="histats_online"></Box>
              </Paper>
            </Stack>
          )}

          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
