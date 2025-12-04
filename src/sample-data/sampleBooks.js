const sampleBooks = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    title: `Sample Book Title ${i + 1}`,
    author: `Author ${i + 1}`,
    cover: `https://picsum.photos/seed/book${i + 1}/400/600`,
    tags: i % 2 ? ['Research', 'PDF'] : ['Fiction', 'Borrow']
}))


export default sampleBooks