const express = require('express');
const router  = express.Router();



module.exports  = (db) => {

router.get("/", (req, res) => {
    // let user = FindUserObject(req.session.user_id);
    const templateVars = { };
    res.redirect('/');
  });

router.get("/:story_id", (req, res) => {
   
    
// REDIRECTS TO STORY SPECIFIC PAGE AND RENDERS DATA FROM DATABASE    
    db.query(`SELECT title, description FROM stories
              WHERE id = ${req.params.story_id};`)
      .then(data => {
        const story = data.rows;
        // console.log({story})
        //console.log(JSON.stringify({story}))
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
