const express = require("express");
const { onlyAuthUser } = require("../controllers/users");
const { datauri } = require('../services/datauri')


const router = express.Router();

const { cloudUpload } = require('../services/cloudinary');

const upload = require('../services/multer');
const singleUpload = upload.single('image');

const singleUploadCtrl = (req, res, next) => {
    singleUpload(req, res, (error) => {
        if(error) {
            return res.sendApiError({
                title: "Upload Error",
                detail: error.message,
            });
        }
        next();
    })
}

router.post("", onlyAuthUser, singleUploadCtrl, async (req, res) => {

    try {
        if(!req.file){ throw new Error('Image is not presented!') }
        const file64 = datauri(req.file);
        const result = await cloudUpload(file64.content)
        console.log(result)
        return res.json({message: 'Uploading file...'})
    } catch (error) {
        return res.sendApiError({
            title: "Upload Error",
            detail: error.message,
        });
    }

    
});

module.exports = router;
