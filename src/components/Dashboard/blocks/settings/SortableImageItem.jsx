import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

export default function SortableImageItem({ id, src, onRemove }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      sx={{
        position: "relative",
        borderRadius: 1,
        overflow: "hidden",
        boxShadow: 1,
      }}
    >
      {/* IMAGE (KHÔNG DRAG) */}
      <Box
        component="img"
        src={src}
        alt=""
        sx={{
          width: "100%",
          height: 120,
          objectFit: "cover",
          display: "block",
          pointerEvents: "none", // quan trọng
        }}
      />

      {/* DRAG HANDLE */}
      <IconButton
        {...attributes}
        {...listeners}
        size="small"
        sx={{
          position: "absolute",
          bottom: 4,
          left: 4,
          bgcolor: "rgba(0,0,0,0.6)",
          color: "white",
          cursor: "grab",
          "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
        }}
      >
        <DragIndicatorIcon fontSize="small" />
      </IconButton>

      {/* DELETE */}
      <IconButton
        size="small"
        color="error"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
        }}
        sx={{
          position: "absolute",
          top: 4,
          right: 4,
          bgcolor: "white",
        }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
