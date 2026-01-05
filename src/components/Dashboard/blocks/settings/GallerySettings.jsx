import { Box, TextField, Button } from "@mui/material";
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import SortableImageItem from "./SortableImageItem";

export default function GallerySettings({ value, onChange }) {
  // ✅ NORMALIZE SETTINGS
  const settings = {
    images: [],
    columns: 4,
    ...(value || {}),
  };

  const update = (patch) => {
    onChange({ ...settings, ...patch });
  };

  /* ================= UPLOAD ================= */
  const handleFiles = async (files) => {
    const uploaded = [];

    for (const file of files) {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch("http://localhost:5000/api/media/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: form,
      });

      const data = await res.json();
      uploaded.push(data.url);
    }

    update({ images: [...settings.images, ...uploaded] });
  };

  /* ================= SORT ================= */
  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = settings.images.indexOf(active.id);
    const newIndex = settings.images.indexOf(over.id);

    update({
      images: arrayMove(settings.images, oldIndex, newIndex),
    });
  };

  return (
    <Box sx={{ mt: 2 }}>
      {/* COLUMNS */}
      <TextField
        label="Columns"
        type="number"
        value={settings.columns}
        onChange={(e) =>
          update({ columns: Number(e.target.value) || 1 })
        }
        fullWidth
      />

      {/* UPLOAD */}
      <Button
        component="label"
        variant="outlined"
        sx={{ mt: 2 }}
      >
        Upload Images
        <input
          hidden
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </Button>

      {/* PREVIEW + SORT */}
      <Box sx={{ mt: 2 }}>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={settings.images}
            strategy={rectSortingStrategy}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: `repeat(${settings.columns}, 1fr)`,
                gap: 1.5,
              }}
            >
              {settings.images.map((src) => (
                <SortableImageItem
                  key={src}
                  id={src}
                  src={src}
                  onRemove={(id) =>
                    update({
                      images: settings.images.filter((x) => x !== id),
                    })
                  }
                />
              ))}
            </Box>
          </SortableContext>
        </DndContext>
      </Box>
    </Box>
  );
}
