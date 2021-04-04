const { request } = require('express');
const express = require('express');
const router  = express.Router();



module.exports  = (db) => {

router.get("/", (req, res) => {
    const templateVars = {};
    res.render("CreatorPage",templateVars);
});

// PRINTS TITLE LIST TO MAIN PAGE  
router.post("/", (req, res) => {
    console.log(req.body)
    db.query(`INSERT INTO stories (title, description, created_at, publish_date, creator_id)
              VALUES ('${req.body.title}', '${req.body.story}','2020-01-12T08:00:00.000Z', null, 2) 
              RETURNING *;`)
    .then(data => {
       console.log('inserted') 
       console.log(data)
       //res.redirect('/story/:story_id')
    })
    .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
    });
});

  return router;
};

