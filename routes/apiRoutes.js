const router = require("express").Router();
const storage = require("../db/notes");

// GET request
router.get("/notes", function(req, res) {
  storage
    .getNotes()
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
});

// POST request
router.post("/notes", function(req, res) {
  storage
    .postNote(req.body)
    .then((note) => res.json(note))
    .catch(err => res.status(500).json(err));
});

// DELETE request:
router.delete("/notes", function(req, res) {
  storage
    .deleteNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch(err => res.status(500).json(err));
});

module.exports = router;