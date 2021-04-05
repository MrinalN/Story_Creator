const express = require('express');
const router  = express.Router();



module.exports  = (db) => {

router.get("/", (req, res) => {
    const templateVars = {};
    res.render("CreatorPage",templateVars);
});

// ADDS TO DB THE STORY --->ADD USER ID <------
router.post("/", (req, res) => {
    db.query(`INSERT INTO stories (title, description, created_at, publish_date, creator_id)
              VALUES ('${req.body.title}', '${req.body.story}','2020-01-12T08:00:00.000Z', null, ${req.session.user_id}) 
              RETURNING *;`)
    .then(data => {      
       let storyId = data['rows'][0]['id']
       res.redirect(`/story/${storyId}`)
    })
    .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
    });
});

  return router;
};

