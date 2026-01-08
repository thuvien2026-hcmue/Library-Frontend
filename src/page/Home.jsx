// Home.jsx
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Container,
  Box,
  Fab,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// import sampleBooks from "../sample-data/sampleBooks";
import BGImage from "../assets/image/bg_img.jpg";
import BGImage2 from "../assets/image/bg_img2.jpg";
import AD1 from "../assets/image/advert_1.jpg";
import AD2 from "../assets/image/advert_2.jpg";
import AD3 from "../assets/image/advert_3.jpg";
import Contact1 from "../assets/image/contact_1.gif";
import Contact2 from "../assets/image/contact_2.jpg";
import Contact3 from "../assets/image/contact_3.jpg";
import Contact4 from "../assets/image/contact_4.jpg";

import HeroSlider from "../components/Home/HeroSlider";
import NewsEventSection from "../components/Home/NewsEventSection";
import PartnerSlider from "../components/Home/PartnerSlider";
import VideoSection from "../components/Home/VideoSection";
import TrendingResources from "../components/Home/TrendingResources";
import GallerySection from "../components/Home/GallerySection";
import DatabaseSidebar from "../components/Home/DatabaseSidebar";
import Chatbot from "../components/Chatbot";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-cube";
import Advertise from "../components/Home/Advertise";

export default function Home() {
  /* =========================
     STATE
  ========================= */
  const [open, setOpen] = useState(false);
  const [openTab, setOpenTab] = useState(false);
  const [heroImages, setHeroImages] = useState([]);
  const [gallerySettings, setGallerySettings] = useState(null);
  const [partnerLinks, setPartnerLinks] = useState([]);
  const [advertiseItems, setAdvertiseItems] = useState([]);
  const [trendBooks, setTrendBooks] = useState([]);

  useEffect(() => {
    fetch("https://library-backend-xhvu.onrender.com/api/trend-books?limit=20")
      .then((r) => r.json())
      .then((data) => setTrendBooks(data?.data || []))
      .catch(() => setTrendBooks([]));
  }, []);


  /* =========================
     LOAD HERO FROM DB
     (page_id = 1 → HOME)
  ========================= */
  useEffect(() => {
    fetch("https://library-backend-xhvu.onrender.com/api/page-blocks/page/1")
      .then((res) => res.json())
      .then((blocks) => {
        // HERO
        const hero = blocks.find(
          (b) => b.block_type === "hero_slider" && b.is_active
        );

        if (hero?.settings?.images?.length) {
          setHeroImages(hero.settings.images);
        }

        // GALLERY
        const gallery = blocks.find(
          (b) => b.block_type === "gallery" && b.is_active
        );

        if (gallery?.settings) {
          setGallerySettings(gallery.settings);
        }

        // PARTNER
        const partner = blocks.find(
          (b) => b.block_type === "partner_slider" && b.is_active
        );

        if (partner?.settings?.items?.length) {
          setPartnerLinks(partner.settings.items);
        }

        const advertise = blocks.find(
          b => b.block_type === "advertise" && b.is_active
        );

        if (advertise?.settings?.items?.length) {
          setAdvertiseItems(advertise.settings.items);
        }
      })
      .catch(() => {
        // silent fail → fallback used
      });
  }, []);



  /* =========================
     LOCAL GALLERY IMAGES
  ========================= */
  function importAll(r) {
    return r.keys().map(r);
  }

  const images = importAll(
    require.context("../assets/image/camera", false, /\.(png|jpe?g|gif)$/)
  ).sort((a, b) => {
    const na = a.match(/\d+/)?.[0];
    const nb = b.match(/\d+/)?.[0];
    return na - nb;
  });

  /* =========================
     PARTNER LINKS
  ========================= */
  const links = [
    { url: "https://stinet.gov.vn/", image_url: Contact1 },
    { url: "https://hub.idk.org.vn/", image_url: Contact2 },
    { url: "https://www.vnulib.edu.vn/", image_url: Contact3 },
    { url: "https://lrc.ctu.edu.vn/", image_url: Contact4 },
  ];

  /* =========================
     RENDER
  ========================= */
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

      {/* ===== HERO (DB FIRST, FALLBACK SECOND) ===== */}
      <HeroSlider
        images={heroImages.length ? heroImages : [AD1, AD2, AD3]}
      />

      <Container maxWidth="lg">
        <NewsEventSection />
        <PartnerSlider
          links={partnerLinks.length ? partnerLinks : links}
        />
      </Container>

      <VideoSection
        open={open}
        setOpen={setOpen}
        BGImage2={BGImage2}
      />

      <Container maxWidth="lg">
        <TrendingResources books={trendBooks} />
      </Container>

      <GallerySection
        images={gallerySettings?.images?.length ? gallerySettings.images : images}
        BGImage={BGImage}
      />

      {/* ===== DATABASE SIDEBAR ===== */}
      <Fab
        color="primary"
        onClick={() => setOpenTab(true)}
        sx={{
          position: "fixed",
          top: JSON.parse(localStorage.getItem("user")) ? 154 : 120,
          right: 24,
          zIndex: 1100,
        }}
      >
        <MenuIcon />
      </Fab>

      <DatabaseSidebar
        sx={{ zIndex: 1400 }}
        open={openTab}
        onClose={() => setOpenTab(false)}
      />

      <Container maxWidth="lg">
        <Advertise items={advertiseItems} />
      </Container>
    </Box>
  );
}
