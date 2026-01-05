import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Advertise({ items = [] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!items.length) return;

    // ✅ show once per session
    const seen = sessionStorage.getItem("advertise_seen");
    if (!seen) {
      setOpen(true);
      sessionStorage.setItem("advertise_seen", "1");
    }
  }, [items]);

  if (!items.length) return null;

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="sm"
      fullWidth
    >
      <IconButton
        onClick={() => setOpen(false)}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 10,
          bgcolor: "white",
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ p: 0 }}>
        {items.map((item, i) => (
          <Box
            key={i}
            component="img"
            src={item.image}
            onClick={() => {
              if (item.url) window.open(item.url, "_blank");
              setOpen(false);
            }}
            sx={{
              width: "100%",
              display: "block",
              cursor: item.url ? "pointer" : "default",
            }}
          />
        ))}
      </DialogContent>
    </Dialog>
  );
}
