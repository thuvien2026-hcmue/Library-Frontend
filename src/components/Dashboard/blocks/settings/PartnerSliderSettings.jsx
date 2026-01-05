import { Box, TextField, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

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

export default function PartnerSliderSettings({ value, onChange }) {
  const settings = {
    items: [],
    ...(value || {}),
  };

  const update = (patch) => {
    onChange({ ...settings, ...patch });
  };

  /* ================= UPLOAD LOGO ================= */
  const uploadLogo = async (file, index) => {
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

    const newItems = [...settings.items];
    newItems[index].image_url = data.url;

    update({ items: newItems });
  };

  /* ================= SORT ================= */
  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = settings.items.findIndex(
      (x) => x.image_url === active.id
    );
    const newIndex = settings.items.findIndex(
      (x) => x.image_url === over.id
    );

    update({
      items: arrayMove(settings.items, oldIndex, newIndex),
    });
  };

  return (
    <Box sx={{ mt: 2 }}>
      {/* ADD PARTNER */}
      <Button
        startIcon={<AddIcon />}
        variant="outlined"
        onClick={() =>
          update({
            items: [
              ...settings.items,
              { image_url: "", url: "" },
            ],
          })
        }
      >
        Add Partner
      </Button>

      {/* LIST */}
      <Box sx={{ mt: 2 }}>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={settings.items.map((i) => i.image_url || Math.random())}
            strategy={rectSortingStrategy}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {settings.items.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  {/* LOGO */}
                  {item.image_url ? (
                    <SortableImageItem
                      id={item.image_url}
                      src={item.image_url}
                      onRemove={() =>
                        update({
                          items: settings.items.filter(
                            (_, i) => i !== index
                          ),
                        })
                      }
                    />
                  ) : (
                    <Button component="label" variant="outlined">
                      Upload Logo
                      <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          uploadLogo(e.target.files[0], index)
                        }
                      />
                    </Button>
                  )}

                  {/* LINK */}
                  <TextField
                    label="Partner URL"
                    value={item.url}
                    onChange={(e) => {
                      const newItems = [...settings.items];
                      newItems[index].url = e.target.value;
                      update({ items: newItems });
                    }}
                    fullWidth
                  />

                  <IconButton
                    color="error"
                    onClick={() =>
                      update({
                        items: settings.items.filter(
                          (_, i) => i !== index
                        ),
                      })
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </SortableContext>
        </DndContext>
      </Box>
    </Box>
  );
}
