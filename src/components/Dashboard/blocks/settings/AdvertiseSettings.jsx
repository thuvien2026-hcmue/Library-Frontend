import { Box, TextField, Button } from "@mui/material";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    rectSortingStrategy,
} from "@dnd-kit/sortable";

import SortableImageItem from "./SortableImageItem";

export default function AdvertiseSettings({ value, onChange }) {
    const settings = {
        items: [],
        ...(value || {}),
    };

    const update = (patch) => {
        onChange({ ...settings, ...patch });
    };

    /* ===== UPLOAD ===== */
    const handleFiles = async (files) => {
        const uploaded = [];

        for (const file of files) {
            const form = new FormData();
            form.append("file", file); // ✅ MATCH ROUTE

            const res = await fetch("http://localhost:5000/api/media/upload", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: form,
            });

            const data = await res.json();

            if (data?.url) {
                uploaded.push({ image: data.url, url: "" });
            } else {
                console.error("Upload failed:", data);
            }
        }

        update({ items: [...settings.items, ...uploaded] });
    };


    /* ===== SORT ===== */
    const onDragEnd = (e) => {
        const { active, over } = e;
        if (!over || active.id === over.id) return;

        const oldIndex = settings.items.findIndex(
            (i) => i.image === active.id
        );
        const newIndex = settings.items.findIndex(
            (i) => i.image === over.id
        );

        update({
            items: arrayMove(settings.items, oldIndex, newIndex),
        });
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Button component="label" variant="outlined">
                Upload Advertise Images
                <input
                    hidden
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFiles(e.target.files)}
                />
            </Button>

            <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                <SortableContext
                    items={settings.items.map((i) => i.image)}
                    strategy={rectSortingStrategy}
                >
                    <Box
                        sx={{
                            mt: 2,
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(160px,1fr))",
                            gap: 2,
                        }}
                    >
                        {settings.items.map((item) => (
                            <Box key={item.image}>
                                <SortableImageItem
                                    id={item.image}
                                    src={item.image}
                                    onRemove={() =>
                                        update({
                                            items: settings.items.filter(
                                                (i) => i.image !== item.image
                                            ),
                                        })
                                    }
                                />

                                <TextField
                                    label="Link URL (optional)"
                                    value={item.url || ""}
                                    onChange={(e) =>
                                        update({
                                            items: settings.items.map((i) =>
                                                i.image === item.image
                                                    ? { ...i, url: e.target.value }
                                                    : i
                                            ),
                                        })
                                    }
                                    size="small"
                                    fullWidth
                                    sx={{ mt: 1 }}
                                />
                            </Box>
                        ))}
                    </Box>
                </SortableContext>
            </DndContext>
        </Box>
    );
}
