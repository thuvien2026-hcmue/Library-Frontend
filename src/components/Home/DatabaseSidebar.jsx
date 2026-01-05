import React, { useEffect, useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE = "http://localhost:5000/api";

export default function DatabaseSidebar({ open, onClose }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return; // chỉ fetch khi mở sidebar

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${API_BASE}/posts/list/co-so-du-lieu`
        );

        // API trả về { success, data }
        setItems(res.data.data || []);
      } catch (err) {
        console.error("Fetch database sidebar error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [open]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 360,
          p: 2,
        },
      }}
    >
      {/* HEADER */}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography fontWeight={800} fontSize={18}>
          CƠ SỞ DỮ LIỆU TRỰC TUYẾN
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* LIST */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress size={24} />
        </Box>
      ) : (
        <List>
          {items.map((item) => (
            <ListItemButton
              key={item.slug}
              component={Link}
              to={`/${item.page_slug}/${item.slug}`} // 👈 URL lưu trong description
            >
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  fontWeight: 600,
                }}
              />
            </ListItemButton>
          ))}
        </List>
      )}
    </Drawer>
  );
}
