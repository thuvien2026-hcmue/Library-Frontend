import React, { useEffect, useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    InputBase,
    Box,
    Typography,
    Avatar,
    Button,
    Paper,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
    useTheme,
    Collapse,
    useMediaQuery,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeMode } from "../context/ThemeContext";
import LogoIMG from "../assets/image/logo.jpg";

import { Link as RouterLink } from "react-router-dom";
import NavButton from "./NavButton";
import HoverMenuButton from "./HoverMenuButton";

export default function Header() {
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const { darkMode, setDarkMode } = useThemeMode();
    const [openIntro, setOpenIntro] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [openService, setOpenService] = useState(false);
    const [openSupport, setOpenSupport] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);



    const toggleDrawer = (state) => () => {
        setOpen(state);
    };
    const isLGUp = useMediaQuery(theme.breakpoints.up("lg"));
    useEffect(() => {
        if (isLGUp) {
            setOpen(false);
        }
    }, [isLGUp]);


    return (
        <>
            {/* TOP NAVBAR */}
            <AppBar
                position="fixed"
                color="default"
                elevation={scrolled ? 6 : 0}
                sx={{
                    backdropFilter: "blur(10px)",
                    bgcolor: theme.palette.background.paper,
                    transition: "all 0.25s ease",
                    py: 1,
                }}
            >
                <Toolbar
                    sx={{
                        gap: 2,
                        py: 1,
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {/* LEFT SIDE — MOBILE MENU */}
                    <IconButton
                        edge="start"
                        onClick={toggleDrawer(true)}
                        sx={{
                            display: { xs: "flex", lg: "none" },
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* LOGO */}
                    <Box
                        component={RouterLink}
                        to="/"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            textDecoration: "none",
                            minWidth: 0,
                        }}
                    >
                        <Box
                            component="img"
                            src={LogoIMG}
                            alt="Logo"
                            sx={{
                                width: { xs: 50, sm: 70 }, // responsive width
                                height: "auto", // keeps aspect ratio
                                objectFit: "contain", // ensures it doesn't stretch
                            }}
                        />

                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                fontWeight: 700,
                                display: { xs: "none", sm: "block" },
                            }}
                        >
                            Library HCMUE
                        </Typography>
                    </Box>


                    {/* --- NAVIGATION LINKS (HIDE ON MOBILE) --- */}
                    <Box
                        sx={{
                            display: { xs: "none", lg: "flex" },
                            gap: 1,
                            alignItems: "center",
                        }}
                    >
                        <NavButton to="/">Trang chủ</NavButton>

                        <HoverMenuButton
                            title="Giới thiệu"
                            items={[
                                { label: "Giới thiêu chung", to: "/gioi-thieu/gioi-thieu" },
                                { label: "Cơ cấu tổ chức", to: "/gioi-thieu/co-cau" },
                                { label: "Chức năng nhiệm vụ", to: "/gioi-thieu/chuc-nang" },
                                { label: "Nội quy thư viện", to: "/gioi-thieu/noi-quy" },
                            ]}
                        />

                        <HoverMenuButton
                            title="Tra cứu"
                            items={[
                                { label: "Mục lục trực tuyến", to: "/tra-cuu/muc-luc" },
                                { label: "Thư viện số", to: "/tra-cuu/thu-vien-so" },
                                { label: "Tìm kiếm tập trung", to: "/tra-cuu/nang-cao" },
                            ]}
                        />

                        <NavButton to="/san-pham">Sản phẩm</NavButton>

                        <HoverMenuButton
                            title="Dịch vụ"
                            items={[
                                { label: "Mượn đọc tại chỗ", to: "/dich-vu/muon-sach" },
                                { label: "Mượn sách về nhà", to: "/dich-vu/phong-doc" },
                                { label: "Cung cấp phòng học nhóm", to: "/dich-vu/ho-tro" },
                                { label: "Tư vấn thông tin", to: "/dich-vu/phong-doc" },
                                { label: "Cung cấp thông tin - tài liệu theo yêu cầu", to: "/dich-vu/ho-tro" },
                            ]}
                        />

                        <HoverMenuButton
                            title="Hỗ trợ"
                            items={[
                                { label: "Phản hồi góp ý", to: "/ho-tro/faq" },
                                { label: "Đề nghị mua tài liệu", to: "/ho-tro/huong-dan" },
                                { label: "Yêu cầu di chuyển tài liệu", to: "/ho-tro/tai-nguyen" },
                                { label: "Cẩm nang hướng dẫn", to: "/ho-tro/huong-dan" },
                                { label: "Hướng dẫn sử dụng", to: "/ho-tro/tai-nguyen" },
                            ]}
                        />

                        <NavButton to="/lien-he">Liên hệ</NavButton>
                    </Box>

                    {/* SPACER */}
                    <Box sx={{ flexGrow: 1 }} />

                    {/* --- SEARCH BAR --- */}
                    <Paper
                        component="form"
                        elevation={2}
                        sx={{
                            display: { xs: "none", sm: "flex" }, // show on sm and above
                            alignItems: "center",
                            width: { sm: 200, md: 280, lg: 380 }, // responsive width
                            px: 1.5,
                            py: 0.5,
                            borderRadius: "50px",
                            transition: "0.25s ease",
                        }}
                    >
                        <SearchIcon color="action" />
                        <InputBase
                            placeholder="Tìm sách..."
                            sx={{
                                ml: 1,
                                flex: 1,
                            }}
                        />
                        <Button variant="contained" size="small" sx={{ borderRadius: "20px" }}>
                            Tìm
                        </Button>
                    </Paper>

                    {/* DARK MODE BUTTON */}
                    <IconButton
                        onClick={() => setDarkMode(!darkMode)}
                        sx={{
                            bgcolor: "background.paper",
                            boxShadow: 2,
                            width: 42,
                            height: 42,
                            borderRadius: "12px",
                            ml: 1,
                            "&:hover": {
                                transform: "scale(1.07)",
                            },
                            transition: "0.2s",
                        }}
                    >
                        {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* --- MOBILE DRAWER --- */}
            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)} sx={{ zIndex: 12000 }}>
                <Box sx={{ width: 260, p: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                        <Box
                            component="img"
                            src={LogoIMG}
                            alt="Logo"
                            sx={{
                                width: { xs: 50, sm: 70 }, // responsive width
                                height: "auto", // keeps aspect ratio
                                objectFit: "contain", // ensures it doesn't stretch
                            }}
                        />
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Menu
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 1 }} />
                    <List>

                        {/* HOME */}
                        <ListItem disablePadding>
                            <ListItemButton
                                component={RouterLink}
                                to="/"
                                onClick={toggleDrawer(false)}
                            >
                                <ListItemText primary="Trang chủ" />
                            </ListItemButton>
                        </ListItem>

                        {/* GIỚI THIỆU */}
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => setOpenIntro(!openIntro)}>
                                <ListItemText primary="Giới thiệu" />
                            </ListItemButton>
                        </ListItem>

                        <Collapse in={openIntro} timeout="auto" unmountOnExit>
                            <List sx={{ pl: 3 }}>
                                <ListItemButton component={RouterLink} to="/gioi-thieu/gioi-thieu" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Giới thiệu chung" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/gioi-thieu/co-cau" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Cơ cấu tổ chức" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/gioi-thieu/chuc-nang" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Chức năng nhiệm vụ" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/gioi-thieu/noi-quy" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Nội quy thư viện" />
                                </ListItemButton>
                            </List>
                        </Collapse>

                        {/* TRA CỨU */}
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => setOpenSearch(!openSearch)}>
                                <ListItemText primary="Tra cứu" />
                            </ListItemButton>
                        </ListItem>

                        <Collapse in={openSearch} timeout="auto" unmountOnExit>
                            <List sx={{ pl: 3 }}>
                                <ListItemButton component={RouterLink} to="/tra-cuu/tai-lieu" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Mục lục trực tuyến" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/tra-cuu/muc-luc" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Thư viện số" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/tra-cuu/nang-cao" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Tìm kiếm tập trung" />
                                </ListItemButton>
                            </List>
                        </Collapse>

                        {/* SẢN PHẨM */}
                        <ListItem disablePadding>
                            <ListItemButton
                                component={RouterLink}
                                to="/san-pham"
                                onClick={toggleDrawer(false)}
                            >
                                <ListItemText primary="Sản phẩm" />
                            </ListItemButton>
                        </ListItem>

                        {/* DỊCH VỤ */}
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => setOpenService(!openService)}>
                                <ListItemText primary="Dịch vụ" />
                            </ListItemButton>
                        </ListItem>

                        <Collapse in={openService} timeout="auto" unmountOnExit>
                            <List sx={{ pl: 3 }}>
                                <ListItemButton component={RouterLink} to="/dich-vu/muon-sach" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Mượn đọc tại chỗ" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/dich-vu/phong-doc" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Mượn sách về nhà" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/dich-vu/ho-tro" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Cung cấp phòng học nhóm" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/dich-vu/ho-tro" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Tư vấn thông tin" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/dich-vu/ho-tro" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Cung cấp thông tin - tài liệu theo yêu cầu" />
                                </ListItemButton>
                            </List>
                        </Collapse>

                        {/* HỖ TRỢ */}
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => setOpenSupport(!openSupport)}>
                                <ListItemText primary="Hỗ trợ" />
                            </ListItemButton>
                        </ListItem>

                        <Collapse in={openSupport} timeout="auto" unmountOnExit>
                            <List sx={{ pl: 3 }}>
                                <ListItemButton component={RouterLink} to="/ho-tro/faq" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Phản hồi góp ý" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/ho-tro/huong-dan" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Đề nghị mua tài liệu" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/ho-tro/tai-nguyen" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Yêu cầu di chuyển tài liệu" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/ho-tro/tai-nguyen" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Cẩm nang hướng dẫn" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/ho-tro/tai-nguyen" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Hướng dẫn sử dụng" />
                                </ListItemButton>
                            </List>
                        </Collapse>

                        {/* LIÊN HỆ */}
                        <ListItem disablePadding>
                            <ListItemButton
                                component={RouterLink}
                                to="/lien-he"
                                onClick={toggleDrawer(false)}
                            >
                                <ListItemText primary="Liên hệ" />
                            </ListItemButton>
                        </ListItem>

                    </List>

                    <Divider sx={{ my: 1 }} />

                    {/* LOGIN */}
                    <Box sx={{ mt: 2 }}>
                        <Paper
                            component="form"
                            elevation={1}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                                px: 1.5,
                                py: 0.8,
                                borderRadius: "30px",
                            }}
                        >
                            <SearchIcon color="action" />
                            <InputBase
                                placeholder="Tìm sách..."
                                sx={{
                                    ml: 1,
                                    flex: 1,
                                    fontSize: "0.9rem",
                                }}
                            />
                            <Button
                                variant="contained"
                                size="small"
                                sx={{
                                    borderRadius: "20px",
                                    px: 2,
                                }}
                            >
                                Tìm
                            </Button>
                        </Paper>
                    </Box>

                </Box>
            </Drawer>
        </>
    );

}
