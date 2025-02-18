const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// إعداد CORS للسماح بجميع المصادر (لأغراض الاختبار فقط)
app.use(cors({
  origin: '*',
  methods: ['POST']
}));

// إنشاء مجلد uploads إذا لم يكن موجودًا
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// إعداد Multer لتخزين الصور
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // حد أقصى 5MB
  }
});

// مسار استقبال الصور
app.post('/uploads', upload.single('image'), (req, res) => {

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // إنشاء رابط عام للصورة
    const publicUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
    res.json({
      success: true,
      url: publicUrl,
      filename: req.file.filename
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// مسار لعرض الصور
app.use('/uploads', express.static(uploadDir));

// تشغيل الخادم
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`🔗 Use this ngrok URL in your XSS script: https://YOUR_NGROK_ID.ngrok.io/upload`);
});