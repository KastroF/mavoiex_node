// middlewares/multer.js

const multer = require('multer');
const { cloudinary } = require('./cloudinaryConfig');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith('video/');
    return {
      folder: 'uploads_ma_voix',
      resource_type: isVideo ? 'video' : 'image',
      allowed_formats: ['jpg', 'jpeg', 'heic', 'png', 'mp4', 'mov', 'quicktime'],
      ...(isVideo
        ? {} // Pas de transformation pour les vidéos
        : { transformation: [{ width: 800, height: 600, crop: 'limit' }] }),
    };
  },
});
const multerInstance = multer({ storage });

const handleUpload = (req, res, next) => {
  multerInstance.single('file')(req, res, function (err) {
    if (err) {
      console.error('Erreur upload multer :', err);
      return res.status(400).json({ error: 'Échec de l’upload du fichier.', details: err.message });
    }
    next();
  });
};

module.exports = { handleUpload };
