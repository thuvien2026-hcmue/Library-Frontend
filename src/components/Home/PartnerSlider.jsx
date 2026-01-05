// components/home/PartnerSlider.jsx
import { Box, Typography, IconButton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

export default function PartnerSlider({ links }) {
  
  return (
    
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
      <Typography
        sx={{
          textAlign: "center",
          fontWeight: 800,
          fontSize: { xs: "1.2rem", md: "1.6rem" },
          mb: 2,
          letterSpacing: "0.5px",
        }}
      >
        Đơn vị liên kết
      </Typography>

      {/* Buttons */}
      <IconButton className="nav-btn" sx={{ position: "absolute", top: "50%", left: 5 }}>
        <ArrowBackIosNew fontSize="small" />
      </IconButton>

      <IconButton className="nav-btn" sx={{ position: "absolute", top: "50%", right: 5 }}>
        <ArrowForwardIos fontSize="small" />
      </IconButton>

      <Swiper
        modules={[Navigation]}
        slidesPerView={4}
        spaceBetween={30}
        navigation={{
          prevEl: ".nav-btn:first-of-type",
          nextEl: ".nav-btn:last-of-type",
        }}
      >
        {links.map((item, i) => (
          <SwiperSlide key={i}>
            <Box
              component="img"
              src={item.image_url}
              onClick={() => window.open(item.url, "_blank")}
              sx={{
                width: "100%",
                height: 90,
                objectFit: "contain",
                cursor: "pointer",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
