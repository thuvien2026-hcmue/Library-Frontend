// Home.jsx
import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  Card,
  CardContent,
  Avatar,
  Rating,
  Stack,
  Tooltip,
  Badge,
  IconButton,
} from "@mui/material";

import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

import BookCard from "../components/Bookcard";
import sampleBooks from "../sample-data/sampleBooks";
import BGImage from "../assets/image/bg_img.jpg";
import AD1 from "../assets/image/advert_1.jpg";
import AD2 from "../assets/image/advert_2.jpg";
import AD3 from "../assets/image/advert_3.jpg";
import Contact1 from "../assets/image/contact_1.gif";
import Contact2 from "../assets/image/contact_2.jpg";
import Contact3 from "../assets/image/contact_3.jpg";
import Contact4 from "../assets/image/contact_4.jpg";
import img01 from "../assets/image/camera/img_1.jpg";
import img02 from "../assets/image/camera/img_2.jpg";
import img03 from "../assets/image/camera/img_3.jpg";
import img04 from "../assets/image/camera/img_4.jpg";
import img05 from "../assets/image/camera/img_5.jpg";
import img06 from "../assets/image/camera/img_6.jpg";
import img07 from "../assets/image/camera/img_7.jpg";
import img08 from "../assets/image/camera/img_8.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-cube";
import { EffectCube } from "swiper/modules";
import Chatbot from "../components/Chatbot";

export default function Home() {

  const news = [
    {
      title: "Ngày sách và văn hóa đọc Năm 2025",
      link: "https://lib.hcmue.edu.vn/node/305",
      text: "Hưởng ứng Ngày Sách và Văn hóa đọc Việt Nam lần thứ IV năm 2025, với Thông điệp:'Văn hóa đọc - Kết nối cộng đồng'.",
    },
    {
      title: "Tiến sĩ Võ Tá Hân trao tặng 957 quyển sách khoa học cho Trường ĐH Sư phạm TPHCM",
      link: "https://lib.hcmue.edu.vn/node/256",
      text: "Tham dự buổi lễ, về phía đơn vị trao tặng sách có: Bà Lê Thị Mỹ Châu – Chủ tịch công ty cổ phần Vinafirst, đại diện Quỹ học bổng Võ Tá Hân; ông Võ Thành Chất – Phó Chủ nhiệm Ủy ban về Người Việt Nam ở nước ngoài Thành phố Hồ Chí Minh; bà Vũ Thị Kiều Dung – Phòng Văn hóa Thông tin xã hội; Đại tá Lê Nam Sơn – Lữ đoàn 125; ông Lê Bá Linh – Chủ tịch Hội đồng quản trị Công ty Pacific Foods; ông Phạm Thái Lâm – Tổng Công ty địa ốc Sài Gòn.",
    },
    {
      title: "Văn hóa đọc với việc hình thành vốn tri thức, kỹ năng sống và phát triển nhân cách con người",
      link: "https://lib.hcmue.edu.vn/node/219",
      text: "Tham dự Hội thảo có đại diện Ban Tuyên giáo Trung ương, Văn phòng Chính phủ; lãnh đạo một số Sở Văn hóa, Thể thao và Du lịch/Văn hóa và Thể thao",
    },
    {
      title: "Mạng thông tin khoa học và công nghệ TP.HCM (STINET)",
      link: "https://lib.hcmue.edu.vn/node/212",
      text: "Hiện nay Thư viện trường Đại học sư phạm TP.HCM đã liên kết với hệ thống mạng liên kết Thông tin khoa học và công nghệ TP.HCM để giúp cho bạn đọc có nhiều nguồn thông tin hơn. Dưới đây là địa chỉ Website và Video hướng dẫn tra cứu",
    },
    {
      title: "Thư cảm ơn về việc tặng sách của tác giả Lê Phát Minh",
      link: "https://lib.hcmue.edu.vn/node/185",
      text: "Thư viện Trường Đại học Sư phạm Thành phố Hồ Chí Minh có nhận 06 cuốn sách của tác giả Lê Phát Minh",
    },
  ];
  const events = [
    {
      title: "Hướng dẫn sử dụng cơ sở dữ liệu ebook EBSCO",
      link: "https://lib.hcmue.edu.vn/node/408",
    },
    {
      title: "Gia hạn thời gian sử dụng Cơ sở dữ liệu Proquest Ebook Central",
      link: "https://lib.hcmue.edu.vn/node/406",
    },
    {
      title: "Về việc hướng dẫn sử dụng và tham quan Thư viện cho sinh viên K51",
      link: "https://lib.hcmue.edu.vn/node/405",
    },
    {
      title: "Tổ chức triển lãm sách kỉ niệm 135 năm ngày sinh Chủ tịch Hồ Chí Minh",
      link: "https://lib.hcmue.edu.vn/node/399",
    },
    {
      title: "Cẩm nang hướng dẫn sử dụng thư viện",
      link: "https://lib.hcmue.edu.vn/node/387",
    },
    {
      title: "Sách mới",
      link: "https://lib.hcmue.edu.vn/node/117",
    },
    {
      title: "Ngưng phục vụ Thư viện tại cơ sở 222 Lê Văn Sỹ",
      link: "https://lib.hcmue.edu.vn/node/358",
    },
  ];
  const links = [
    {
      url: "https://stinet.gov.vn/",
      image_url: Contact1,
    },
    {
      url: "https://hub.idk.org.vn/",
      image_url: Contact2,
    },
    {
      url: "https://www.vnulib.edu.vn/",
      image_url: Contact3,
    },
    {
      url: "https://lrc.ctu.edu.vn/",
      image_url: Contact4,
    },
  ];

  return (

    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        pb: { xs: 8, md: 12 },
      }}
    >
      <Helmet>
        <title>Trang Chủ | HCMUE</title>
      </Helmet>
      <Chatbot />
      <Grid container alignItems="center" sx={{ width: "100%", mb: { xs: 2, md: 3 }, mt: { xs: 6, md: 10 } }}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={10}
            sx={{
              overflow: "hidden",
              borderRadius: 0,
            }}
          >
            <Swiper
              modules={[Autoplay, Pagination, EffectCube]}
              effect="cube"
              grabCursor={true}
              cubeEffect={{
                shadow: true,
                shadowOffset: 40,
                shadowScale: 0.94,
              }}
              slidesPerView={1}
              loop
              pagination={{
                clickable: true,
                renderBullet: (index, className) =>
                  `<span class="${className} custom-bullet"></span>`
              }}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
            >
              {[AD1, AD2, AD3].map((src, i) => (
                <SwiperSlide key={i}>
                  <Box
                    component="img"
                    src={src}
                    alt={`slide-${i}`}
                    sx={{
                      width: "100%",
                      objectFit: "cover",
                      display: "block",
                      height: { xs: 250, sm: 300, md: 500 },
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Paper>
        </Grid>
      </Grid>
      <Container maxWidth="lg" sx={{ pt: { xs: 2, md: 4 } }}>

        <Box sx={{ display: "flex", gap: 3, mb: { xs: 2, md: 4 }, flexWrap: "wrap" }}>
          {/* News & Event Box */}
          <Box
            sx={{
              flex: "1 1 33%",
              minWidth: 250,
              bgcolor: "background.paper",
              p: 3,
              borderRadius: 1,
              boxShadow: 3,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
              Tin Tức & Sự Kiện
            </Typography>

            {news.map((n, i) => (
              <Box
                key={i}
                component="a"
                href={n.link}
                rel="noopener noreferrer"
                sx={{
                  mb: 2,
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700 }}
                >
                  {n.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" noWrap>
                  {n.text}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Notification Box */}
          <Box
            sx={{
              flex: "1 1 33%",
              minWidth: 250,
              bgcolor: "background.paper",
              p: 3,
              borderRadius: 1,
              boxShadow: 3,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
              Thông Báo
            </Typography>
            {events.map((e, i) => (
              <motion.div
                whileHover={{ x: 6, opacity: 0.85 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                <Box
                  key={i}
                  component="a"
                  href={e.link}
                  rel="noopener noreferrer"
                  sx={{
                    mb: 2,
                    display: "block",
                    textDecoration: "none",
                    color: "inherit",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <PlayArrowIcon />
                    {e.title}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            p: 3,
            borderRadius: 3,
            bgcolor: "background.paper",
            position: "relative",
            overflow: "hidden",
            "&:hover .nav-btn": {
              opacity: 1,
              pointerEvents: "auto",
            },
            mb: { xs: 2, md: 4 }
          }}
        >
          {/* ---- Custom MUI Navigation Buttons ---- */}
          <IconButton
            className="nav-btn"
            sx={{
              position: "absolute",
              top: "50%",
              left: 5,
              transform: "translateY(-50%)",
              zIndex: 10,
              bgcolor: "white",
              boxShadow: 2,
              opacity: 0,
              pointerEvents: "none",
              transition: "0.2s",
              "&:hover": { bgcolor: "grey.100" },
            }}
          >
            <ArrowBackIosNew fontSize="small" />
          </IconButton>

          <IconButton
            className="nav-btn"
            sx={{
              position: "absolute",
              top: "50%",
              right: 5,
              transform: "translateY(-50%)",
              zIndex: 10,
              bgcolor: "white",
              boxShadow: 2,
              opacity: 0,
              pointerEvents: "none",
              transition: "0.2s",
              "&:hover": { bgcolor: "grey.100" },
            }}
          >
            <ArrowForwardIos fontSize="small" />
          </IconButton>

          {/* ---- SWIPER ---- */}
          <Swiper
            modules={[Navigation]}
            slidesPerView={4}
            spaceBetween={30}
            navigation={{
              prevEl: ".nav-btn:first-of-type",
              nextEl: ".nav-btn:last-of-type",
            }}
            style={{ width: "100%" }}
          >
            {links.map((item, i) => (
              <SwiperSlide key={i}>
                <Box
                  component="img"
                  src={item.image_url}
                  alt={item.title}
                  sx={{
                    width: "100%",
                    height: 90,
                    objectFit: "contain",
                    filter: "brightness(1)",
                    cursor: "pointer"
                  }}
                  onClick={() => window.open(item.url, "_blank")}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        {/* TRENDING RESOURCES */}
        <Box sx={{ mb: { xs: 8, md: 12 } }}>
          <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Grid item>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                Trending Resources
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Popular this week — curated picks.
              </Typography>
            </Grid>
          </Grid>

          <Swiper
            modules={[Autoplay]}
            slidesPerView={2}
            spaceBetween={30}

            breakpoints={{
              600: { slidesPerView: 3 },
              960: { slidesPerView: 4 },
            }}
            autoplay={{ delay: 2600, disableOnInteraction: false }}
          >
            {sampleBooks.slice(0, 8).map((b) => (
              <SwiperSlide key={b.id}>
                <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                  <Box sx={{ p: 1 }}>
                    <Card
                      sx={{
                        overflow: "hidden",
                        height: "100%",
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {/* Badge */}
                      <Badge
                        badgeContent="New"
                        color="primary"
                        sx={{ position: "absolute", top: 12, left: 12, zIndex: 2 }}
                      />

                      {/* Image */}
                      <Box
                        component="img"
                        src={b.cover || b.image || b.img}
                        alt={b.title}
                        sx={{
                          width: "100%",
                          height: 180,
                          objectFit: "cover",
                          mb: 1,
                        }}
                      />

                      {/* Card Content */}
                      <CardContent
                        sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}
                      >
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                          {b.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {b.author}
                        </Typography>

                        <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                          <Rating value={b.rating || 5} size="small" readOnly />
                          <Typography variant="body2" color="text.secondary">
                            ({b.reviews || 120})
                          </Typography>
                        </Stack>

                        <Box sx={{ mt: "auto" }}>
                          <Button
                            size="small"
                            variant="contained"
                            startIcon={<FavoriteIcon />}
                            sx={{ mt: 2, borderRadius: 2, width: "100%" }}
                          >
                            Borrow
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

        </Box>

      </Container>
      <Box
  sx={{
    width: "100%",
    minHeight: 650,
    backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${BGImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    px: 3,
    py: { xs: 6, md: 10 },
    position: "relative",
  }}
>
  {/* Title */}
  <Typography
    variant="h4"
    sx={{
      fontWeight: 800,
      color: "white",
      textAlign: "center",
      mb: 4,
      textTransform: "uppercase",
      letterSpacing: 1,
    }}
  >
    Khoảnh khắc thư viện
  </Typography>

  {/* IMAGES INSIDE */}
  <Grid container spacing={2} justifyContent="center">
    {[
      img01, img02, img03, img04,
      img05, img06, img07, img08
    ].map((src, i) => (
      <Grid key={i} item xs={12} sm={6} md={3}>
        <Box
          component="img"
          src={src}
          alt={`gallery-${i}`}
          sx={{
            width: "100%",
            height: 220,
            objectFit: "cover",
            borderRadius: 1,
            boxShadow: "0 4px 12px rgba(0,0,0,0.35)",
          }}
        />
      </Grid>
    ))}
  </Grid>
</Box>
    </Box>
  );
}
