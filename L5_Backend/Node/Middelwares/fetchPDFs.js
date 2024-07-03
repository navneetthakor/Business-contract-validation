const path  = require('path');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});



// Set up Cloudinary storage for Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        // to generate unique name, otherwise it will generate error
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); 
        return {
            folder: 'pdfs',  // Folder name in your Cloudinary storage
            public_id: `${file.fieldname}_${uniqueSuffix}.pdf`,  // Remove file extension
            // public_id: file.originalname.replace(path.extname(file.originalname), ''),  // Remove file extension
            format: 'pdf'  // Force format to be PDF
        };
    },
});

// final function which will execute storing process 
const upload = multer({storage: storage});

module.exports = upload;