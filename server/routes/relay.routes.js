const express = require("express");
const {
  getRelays,
  getOneRelay,
  createRelay,
  onOffRelay,
  updateRelay,
  deleteRelay,
} = require("../controllers/relays.config");
const router = express.Router();

router.get("/", getRelays);
router.get("/place", getOneRelay);
router.post("/", createRelay);
router.patch("/:id", updateRelay);
router.delete("/:id", deleteRelay);
router.patch("/onoff/:id", onOffRelay);

module.exports = router;
