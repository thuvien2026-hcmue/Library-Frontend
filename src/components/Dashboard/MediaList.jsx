import { useEffect, useRef, useState } from "react";
import {
    Box,
    Typography,
    ImageList,
    ImageListItem,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function MediaList() {
    const [groups, setGroups] = useState([]);
    const token = localStorage.getItem("token");

    // giữ preview tức thì
    const [preview, setPreview] = useState({});

    const load = async () => {
        const res = await fetch("http://localhost:5000/api/media/group-by-post");
        const data = await res.json();
        setGroups(data);
    };

    useEffect(() => {
        load();
    }, []);

    const updateImage = async (id, file) => {
        // 🔥 preview ngay lập tức
        const localUrl = URL.createObjectURL(file);
        setPreview((p) => ({ ...p, [id]: localUrl }));

        const formData = new FormData();
        formData.append("upload", file);

        await fetch(`http://localhost:5000/api/media/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        load();
    };

    const remove = async (id) => {
        if (!window.confirm("Delete this image?")) return;

        await fetch(`http://localhost:5000/api/media/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        load();
    };

    return (
        <Box>
            <Typography variant="h5" fontWeight={800} mb={3}>
                Media Library
            </Typography>

            {groups.map((group) => (
                <Accordion key={group.post_id}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography fontWeight={700}>
                            {group.post_title} (Post ID: {group.post_id})
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <ImageList cols={4} gap={8}>
                            {group.medias.map((img) => (
                                <ImageItem
                                    key={img.id}
                                    img={img}
                                    preview={preview[img.id]}
                                    onDelete={remove}
                                    onUpdate={updateImage}
                                />
                            ))}
                        </ImageList>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
}

/* ================= IMAGE ITEM ================= */

function ImageItem({ img, preview, onDelete, onUpdate }) {
    const inputRef = useRef(null);

    return (
        <ImageListItem sx={{ position: "relative" }}>
            <img
                src={(preview || img.file_path) + "?v=" + Date.now()}
                loading="lazy"
                style={{ borderRadius: 4 }}
            />

            {/* DELETE */}
            <IconButton
                color="error"
                size="small"
                sx={{ position: "absolute", top: 6, right: 6 }}
                onClick={() => onDelete(img.id)}
            >
                <DeleteIcon fontSize="small" />
            </IconButton>

            {/* EDIT */}
            <IconButton
                color="primary"
                size="small"
                sx={{ position: "absolute", top: 6, right: 36 }}
                onClick={() => inputRef.current.click()}
            >
                <EditIcon fontSize="small" />
            </IconButton>

            <input
                ref={inputRef}
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                    if (e.target.files?.[0]) {
                        onUpdate(img.id, e.target.files[0]);
                    }
                }}
            />
        </ImageListItem>
    );
}
