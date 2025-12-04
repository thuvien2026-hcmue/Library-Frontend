import React from 'react'
import { Card, CardMedia, CardContent, Typography, Box, Chip, Button } from '@mui/material'
import { motion } from 'framer-motion'


export default function BookCard({ book }) {
    return (
        <motion.div whileHover={{ scale: 1.02 }}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia component="img" image={book.cover} sx={{ height: 240 }} />
                <CardContent sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" noWrap sx={{ fontWeight: 600 }}>{book.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{book.author}</Typography>
                    <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {book.tags.map(t => <Chip key={t} size="small" label={t} />)}
                    </Box>
                </CardContent>
                <Box sx={{ p: 1, display: 'flex', gap: 1 }}>
                    <Button fullWidth size="small">View</Button>
                    <Button fullWidth variant="outlined" size="small">Borrow</Button>
                </Box>
            </Card>
        </motion.div>
    )
}