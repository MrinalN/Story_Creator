const express = require('express');
const router  = express.Router();



module.exports  = (db) => {

router.get("/", (req, res) => {
    // let user = FindUserObject(req.session.user_id);
    db.query(`SELECT title FROM stories`)
    .then(data => {
    const story = data.rows;
    const templateVars = { titles : titles};
    res.render("maintitlepage",templateVars);
    })
    .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
    });
    const templateVars = { };
    res.render('/');
  });

// REDIRECTS TO STORY SPECIFIC PAGE AND RENDERS DATA FROM DATABASE  
router.get("/:story_id", (req, res) => { 
    db.query(`SELECT title, description FROM stories
              WHERE id = ${req.params.story_id};`)
      .then(data => {
        const story = data.rows;
        const templateVars = { story : story};
        res.render("story",templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
});


  return router;
};
