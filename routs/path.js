const { Router, json } = require("express");

const router = Router();

router.post("/encrypt", async (req, res) => {
  try {
    const { data } = req.body;
    console.log(data);
    res.json({ message: "ok", data });
  } catch (e) {
    res.status(500).json(e.message);
  }
});
module.exports = router;
