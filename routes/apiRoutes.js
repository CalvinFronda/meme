var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/meme", function (req, res) {
    db.Meme.findAll().then(function (result) {
      res.json(result);
    });
  });

  // Create a new meme
  app.post("/api/meme", function (req, res) {
    db.Meme.create(req.body).then(function (result) {
      res.json(result);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Meme.destroy({ where: { id: req.params.id } }).then(function (result) {
      res.json(result);
    });
  });
};
