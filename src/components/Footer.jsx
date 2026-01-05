import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import { Facebook, Instagram, YouTube, Mail } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      sx={{
        mt: 12,
        pt: 8,
        pb: 4,
        background: "linear-gradient(135deg, #0d1b2a, #1b263b, #1f354d)",
        color: "white",
        position: "relative",
      }}
    >
      <Container maxWidth="lg">

        {/* Glow Line */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
            height: "3px",
            background:
              "linear-gradient(90deg, transparent, #00e5ff, transparent)",
            opacity: 0.5,
          }}
        />

        {/* TOP CONTENT */}
        <Grid container spacing={6}>
          {/* COL 1 - Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              Thư Viện HCMUE
            </Typography>
            <Typography sx={{ opacity: 0.85, mb: 1.5 }}>
              Tòa nhà Thư viện – Nhà làm việc Giáo sư, Lầu 1–7
              280 An Dương Vương, Phường Chợ Quán, TP. Hồ Chí Minh
            </Typography>
            <Typography sx={{ opacity: 0.85 }}>
              SĐT: (028) 38352020 – nội bộ 231
            </Typography>
            <Typography sx={{ opacity: 0.85 }}>Email: thuvien@hcmue.edu.vn</Typography>
          </Grid>

          {/* COL 2 - Quick Links */}
          <Grid quick xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Liên kết nhanh
            </Typography>

            <Stack spacing={1.3}>
              {[
                { title: "Trang chủ", href: "/" },
                { title: "Giới thiệu", href: "/gioi-thieu/gioi-thieu-chung" },
                { title: "Tra cứu tài liệu", href: "/tai-lieu/tai-lieu" },
                { title: "Tin tức – Sự kiện", href: "/tin-tuc" },
                { title: "Liên hệ", href: "/lien-he" },
              ].map((quick, q) => (
                <Typography
                  key={q}
                  component={RouterLink}
                  to={quick.href}
                  sx={{
                    opacity: 0.8,
                    cursor: "pointer",
                    textDecoration: "none",
                    transition: "0.25s",
                    "&:hover": { opacity: 1, pl: 1, color: "#00e5ff" },
                  }}
                >
                  {quick.title}
                </Typography>
              ))}
            </Stack>
          </Grid>

          {/* COL 3 - Contact + Social */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Kết nối với chúng tôi
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              {[
                { icon: <Facebook />, color: "#1877f2", href: "https://www.facebook.com/lib.hcmue.edu.vn" },
                { icon: <YouTube />, color: "#ff0000", href: "https://www.youtube.com/watch?v=r43f1JIExvI" },
              ].map((item, i) => (
                <IconButton
                  key={i}
                  component="a"
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={item.href}
                  sx={{
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.3)",
                    transition: "0.25s",
                    "&:hover": {
                      color: item.color,
                      borderColor: item.color,
                      transform: "scale(1.15)",
                    },
                  }}
                >
                  {item.icon}
                </IconButton>
              ))}
            </Stack>

            <Button
              variant="contained"
              sx={{
                mt: 1,
                px: 4,
                py: 1.3,
                borderRadius: "10px",
                fontWeight: 600,
                background: "linear-gradient(135deg,#00acc1,#00e5ff)",
                boxShadow: "0 4px 15px rgba(0,229,255,0.3)",
                "&:hover": {
                  background: "linear-gradient(135deg,#00c2d1,#5af4ff)",
                  boxShadow: "0 6px 18px rgba(0,229,255,0.45)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Liên hệ ngay
            </Button>
          </Grid>
        </Grid>

        {/* DIVIDER */}
        <Divider
          sx={{
            my: 5,
            borderColor: "rgba(255,255,255,0.2)",
            borderWidth: "0.5px",
          }}
        />

        {/* COPYRIGHT */}
        <Typography
          sx={{
            textAlign: "center",
            opacity: 0.7,
            letterSpacing: 0.4,
          }}
        >
          Copyright © 2020 Thư viện Trường Đại học Sư Phạm Thành Phố Hồ Chí Minh.
        </Typography>
      </Container>
    </Box>
  );
}
