const express = require("express");
const router = express.Router();


const home = (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
};

router.route("/").get(home);
module.exports = router;
