const express = require("express");
const { onlyAuthUser } = require("../controllers/users");

const router = express.Router();

router.post("", onlyAuthUser, (req, res) => {
    return res.json({message: 'uploading file...'})
});

module.exports = router;
