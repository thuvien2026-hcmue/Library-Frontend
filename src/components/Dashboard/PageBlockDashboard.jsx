// components/Dashboard/PageBlockDashboard.jsx
import {
  Box,
  Button,
  Paper,
  Typography,
  Switch,
  IconButton,
  TextField,
  MenuItem,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

// 🔧 SETTINGS RENDERER
import BlockSettingsRenderer from "./blocks/settings/BlockSettingsRenderer";

const BLOCK_TYPES = [
  { value: "hero_slider", label: "Hero Slider" },
  { value: "gallery", label: "Gallery" },
  { value: "partner_slider", label: "Partner Slider" },
  { value: "advertise", label: "Advertise Banner" },
];

export default function PageBlockDashboard() {
  const { pageId } = useParams();
  const token = localStorage.getItem("token");
  const [blocks, setBlocks] = useState([]);

  /* ================= LOAD BLOCKS ================= */
  const load = useCallback(async () => {
    if (!pageId) return;

    const res = await fetch(
      `https://library-backend-xhvu.onrender.com/api/page-blocks/page/${pageId}`
    );
    const data = await res.json();
    setBlocks(Array.isArray(data) ? data : []);
  }, [pageId]);

  useEffect(() => {
    load();
  }, [load]);

  /* ================= CREATE ================= */
  const addBlock = async () => {
    if (!pageId) return alert("Missing pageId");

    await fetch("https://library-backend-xhvu.onrender.com/api/page-blocks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        page_id: Number(pageId),
        block_type: "hero_slider",
        title: "",
        settings: {},
        sort_order: blocks.length,
        is_active: 1,
      }),
    });

    load();
  };

  /* ================= UPDATE ================= */
  const saveBlock = async (block) => {
    await fetch(`https://library-backend-xhvu.onrender.com/api/page-blocks/${block.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        block_type: block.block_type,
        title: block.title,
        settings: block.settings || {},
        sort_order: block.sort_order,
        is_active: block.is_active,
      }),
    });
  };

  /* ================= DELETE ================= */
  const deleteBlock = async (id) => {
    if (!window.confirm("Delete this block?")) return;

    const res = await fetch(
      `https://library-backend-xhvu.onrender.com/api/page-blocks/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      const text = await res.text();
      alert("Delete failed: " + text);
      return;
    }

    load();
  };


  /* ================= RENDER ================= */
  return (
    <Box>
      <Typography variant="h5" fontWeight={800} mb={2}>
        Page Blocks (Page #{pageId})
      </Typography>

      <Button
        startIcon={<AddIcon />}
        variant="contained"
        onClick={addBlock}
        sx={{ mb: 3 }}
      >
        Add Block
      </Button>

      {blocks.map((b, index) => (
        <Paper key={b.id} sx={{ p: 2.5, mb: 3 }}>
          {/* ===== HEADER ===== */}
          <Box
            display="flex"
            gap={2}
            alignItems="center"
            flexWrap="wrap"
          >
            {/* BLOCK TYPE */}
            <TextField
              select
              size="small"
              label="Block Type"
              value={b.block_type}
              onChange={(e) => {
                const value = e.target.value;
                setBlocks((prev) =>
                  prev.map((x) =>
                    x.id === b.id ? { ...x, block_type: value } : x
                  )
                );
              }}
              onBlur={() => saveBlock(b)}
            >
              {BLOCK_TYPES.map((t) => (
                <MenuItem key={t.value} value={t.value}>
                  {t.label}
                </MenuItem>
              ))}
            </TextField>

            {/* TITLE */}
            <TextField
              size="small"
              label="Title"
              value={b.title || ""}
              onChange={(e) => {
                const value = e.target.value;
                setBlocks((prev) =>
                  prev.map((x) =>
                    x.id === b.id ? { ...x, title: value } : x
                  )
                );
              }}
              onBlur={() => saveBlock(b)}
            />

            {/* ACTIVE */}
            <Switch
              checked={!!b.is_active}
              onChange={(e) => {
                const updated = {
                  ...b,
                  is_active: e.target.checked ? 1 : 0,
                };
                setBlocks((prev) =>
                  prev.map((x) =>
                    x.id === b.id ? updated : x
                  )
                );
                saveBlock(updated);
              }}
            />

            {/* DELETE */}
            <IconButton
              color="error"
              onClick={() => deleteBlock(b.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* ===== BLOCK SETTINGS UI ===== */}
          <BlockSettingsRenderer
            block={b}
            onChange={(newSettings) => {
              const updated = { ...b, settings: newSettings };
              setBlocks((prev) =>
                prev.map((x) =>
                  x.id === b.id ? updated : x
                )
              );
              saveBlock(updated);
            }}
          />
        </Paper>
      ))}
    </Box>
  );
}
