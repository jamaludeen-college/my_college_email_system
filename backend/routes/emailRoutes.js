const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const Email = require("../models/Email");

router.get("/pending", authenticate, async (req, res) => {
  try {
    const emails = await Email.find({ status: "pending" });
    res.json(emails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/approve", authenticate, async (req, res) => {
  try {
    const { emailId } = req.body;
    await Email.findByIdAndUpdate(emailId, { status: "approved" });
    res.json({ message: "Email approved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
