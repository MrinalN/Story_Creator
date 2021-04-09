const express = require('express');
const router  = express.Router();



module.exports  = (db) => {

router.get("/", (req, res) => {
  if (req.session.user_id) {
    const templateVars = {};
    res.render("creator",templateVars);
  } else {
    res.redirect("/login")
  }
});

// ADDS TO DB THE STORY --->ADD USER ID <------
router.post("/", (req, res) => {
   if (req.session.user_id) {
    db.query(`INSERT INTO stories (title, description, created_at, publish_date, creator_id)
              VALUES ('${req.body.title}', '${req.body.story}','2020-01-12T08:00:00.000Z', null, ${req.session.user_id})
              RETURNING *;`)
    .then(data => {
       let storyId = data['rows'][0]['id']
       res.redirect(`/stories/${storyId}`)
    })
    .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
    });
  } else {
    res.redirect("/login")
  }
});

  return router;
};

