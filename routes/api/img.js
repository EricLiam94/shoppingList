const router = require("express").Router();
const GoogleImages = require("google-images");
const client = new GoogleImages(
  process.env.CSE_ID,
  process.env.GOOGLE_SEARCH_API
);

// url  localhost:5000/api/img/:query
// access public
router.get("/:query", async (req, res) => {
  try {
    const data = await client.search(req.params.query, { size: "xlarge" });
    res.json({ url: data[0].url });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, msg: error });
  }
});

module.exports = router;
