const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(cors({
    origin: '*',
    methods: ['POST', 'GET']
}));

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('image'), (req, res) => {
    res.json({ 
        success: true,
        url: `/uploads/${req.file.filename}`
    });
});

app.listen(3000, () => console.log('✅ السيرفر يعمل'));