var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/create", function (req, res) {
    db.Meme.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });


  app.get("/", function (req, res) {

    db.Meme.findAll({}).then(function (dbExamples1) {
      res.render("home", {
        msg: "Welcome!",
        examples: dbExamples1
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Meme.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });




  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
