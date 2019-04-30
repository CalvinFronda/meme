var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Meme.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Meme.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Meme.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  app.get('/memes/:id/likes/increment', async (req, res) => {
    try {
      let meme = await db.Meme.findByPk(req.params.id);

      await meme.increment('likesNum', { by: 1 });
      await meme.reload();
      res.json(meme);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  app.get('/memes/:id/dislikes/increment', async (req, res) => {
    try {
      let meme = await db.Meme.findByPk(req.params.id);

      await meme.increment('dislikesNum', { by: 1 });
      await meme.reload();
      res.json(meme);
    } catch (err) {
      res.sendStatus(500);
    }
  });


  app.put('/api/examples/:id', (req, res) => {
    db.Meme.update(
      { likesNum: req.body.likeNum },
      { where: req.params.id }
    ).then(result => {
      res.json(result)
    })

    res.sendStatus(201);
  })


};
