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
import Marquee from "./Marquee";

export default function Header() {
    const theme = useTheme();
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (!search.trim()) return;

        const url = `https://search.hcmue.edu.vn/iii/encore/search/C__S${encodeURIComponent(
            search
        )}`;

        window.location.href = url; // hoặc window.open(url, "_blank")
    };


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
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 33,
                    lineHeight: `${33}px`,
                    background: "#1976d2",   // same as MUI primary.main
                    color: "#fff",
                    zIndex: 1200,            // must be higher than AppBar
                    padding: "0 16px",
                }}
            >
                <Marquee speed={10}>
                    <span style={{ marginRight: 40 }}>Chào mừng bạn đến với Website Thư viện Trường Đại học Sư phạm Thành phố Hồ Chí Minh</span>
                </Marquee>
            </div>
            {/* TOP NAVBAR */}
            <AppBar
                position="fixed"
                color="default"
                elevation={scrolled ? 6 : 0}
                sx={{
                    top: JSON.parse(localStorage.getItem("user")) ? 33 : 0,
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
                                { label: "Giới thiệu chung", to: "/gioi-thieu/gioi-thieu-chung" },
                                { label: "Cơ cấu tổ chức", to: "/gioi-thieu/co-cau-to-chuc" },
                                { label: "Chức năng nhiệm vụ", to: "/gioi-thieu/chuc-nang-nhiem-vu" },
                                { label: "Nội quy thư viện", to: "/gioi-thieu/noi-quy-thu-vien" },
                            ]}
                        />

                        <HoverMenuButton
                            title="Tra cứu"
                            items={[
                                { label: "Mục lục trực tuyến", to: "https://opac.hcmue.edu.vn/" },
                                { label: "Thư viện số", to: "https://dlib.hcmue.edu.vn/" },
                                { label: "Tìm kiếm tập trung", to: "https://search.hcmue.edu.vn/iii/encore/?lang=vie" },
                            ]}
                        />

                        <NavButton to="/tai-lieu/tai-lieu">Tài liệu</NavButton>

                        <HoverMenuButton
                            title="Dịch vụ"
                            items={[
                                { label: "Mượn đọc tại chỗ", to: "/dich-vu/muon-doc-tai-cho" },
                                { label: "Mượn sách về nhà", to: "/dich-vu/muon-sach-ve-nha" },
                                { label: "Cung cấp phòng học nhóm", to: "/dich-vu/cung-cap-phong-hoc-nhom" },
                                { label: "Tư vấn thông tin", to: "/dich-vu/tu-van-thong-tin" },
                                { label: "Cung cấp thông tin - tài liệu theo yêu cầu", to: "/dich-vu/cung-cap-thong-tin-tai-lieu-theo-yeu-cau" },
                            ]}
                        />

                        <HoverMenuButton
                            title="Hỗ trợ"
                            items={[
                                { label: "Phản hồi góp ý", to: "/ho-tro/phan-hoi-gop-y" },
                                { label: "Đề nghị mua tài liệu", to: "/ho-tro/de-nghi-mua-tai-lieu" },
                                { label: "Yêu cầu di chuyển tài liệu", to: "/ho-tro/yeu-cau-di-chuyen-tai-lieu" },
                                { label: "Cẩm nang hướng dẫn", to: "/ho-tro/cam-nang-huong-dan" },
                                { label: "Hướng dẫn sử dụng", to: "/ho-tro/huong-dan-su-dung" },
                            ]}
                        />

                        <NavButton to="/lien-he/thu-vien-truong-dai-hoc-su-pham-tp-ho-chi-minh">Liên hệ</NavButton>

                        <NavButton to="/van-ban/van-ban">Văn bản</NavButton>
                    </Box>

                    {/* SPACER */}
                    <Box sx={{ flexGrow: 1 }} />

                    {/* --- SEARCH BAR --- */}
                    <Paper
                        component="form"
                        onSubmit={handleSearch}
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
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            sx={{
                                ml: 1,
                                flex: 1,
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            size="small"
                            sx={{ borderRadius: "20px" }}
                        >
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
                                <ListItemButton component={RouterLink} to="/gioi-thieu/gioi-thieu-chung" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Giới thiệu chung" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/gioi-thieu/co-cau-to-chuc" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Cơ cấu tổ chức" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/gioi-thieu/chuc-nang-nhiem-vu" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Chức năng nhiệm vụ" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/gioi-thieu/noi-quy-thu-vien" onClick={toggleDrawer(false)}>
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
                                <ListItemButton component={RouterLink} to="https://opac.hcmue.edu.vn/" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Mục lục trực tuyến" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="https://dlib.hcmue.edu.vn/" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Thư viện số" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="https://search.hcmue.edu.vn/iii/encore/?lang=vie" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Tìm kiếm tập trung" />
                                </ListItemButton>
                            </List>
                        </Collapse>

                        {/* SẢN PHẨM */}
                        <ListItem disablePadding>
                            <ListItemButton
                                component={RouterLink}
                                to="/tai-lieu/tai-lieu"
                                onClick={toggleDrawer(false)}
                            >
                                <ListItemText primary="Tài liệu" />
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
                                <ListItemButton component={RouterLink} to="/dich-vu/muon-doc-tai-cho" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Mượn đọc tại chỗ" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/dich-vu/muon-sach-ven-nha" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Mượn sách về nhà" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/dich-vu/cung-cap-phong-hop-nhom" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Cung cấp phòng học nhóm" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/dich-vu/tu-van-thong-tin" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Tư vấn thông tin" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/dich-vu/cung-cap-thong-tin-tai-lieu-theo-yeu-cau" onClick={toggleDrawer(false)}>
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
                                <ListItemButton component={RouterLink} to="/ho-tro/phan-hoi-y-kien" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Phản hồi góp ý" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/ho-tro/de-nghi-mua-tai-lieu" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Đề nghị mua tài liệu" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/ho-tro/yeu-cau-di-chuyen-tai-lieu" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Yêu cầu di chuyển tài liệu" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/ho-tro/cam-nang-huong-dan" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Cẩm nang hướng dẫn" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/ho-tro/huong-dan-su-dung" onClick={toggleDrawer(false)}>
                                    <ListItemText primary="Hướng dẫn sử dụng" />
                                </ListItemButton>
                            </List>
                        </Collapse>

                        {/* LIÊN HỆ */}
                        <ListItem disablePadding>
                            <ListItemButton
                                component={RouterLink}
                                to="/lien-he/thu-vien-truong-dai-hoc-su-pham-tp-ho-chi-minh"
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
                            onSubmit={handleSearch}
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
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Tìm sách..."
                                sx={{
                                    ml: 1,
                                    flex: 1,
                                    fontSize: "0.9rem",
                                }}
                            />
                            <Button
                                type="submit"
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
