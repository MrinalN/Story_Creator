const express = require('express');
const router  = express.Router();

module.exports  = (db) => {

// PRINTS TITLE LIST TO MAIN PAGE
router.get("/", (req, res) => {
  // if (!req.session.user_id) {
  //   res.redirect('/login');
  // } else {
    db.query(`SELECT title FROM stories`)
    .then(data => {
    const titles = data.rows;
    const templateVars = { TitleList : titles};
    res.render("stories",templateVars); //Adele changing here
    })
    .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
    });
  // }
});

// REDIRECTS TO STORY SPECIFIC PAGE AND RENDERS DATA FROM DATABASE
router.get("/:stories_id", (req, res) => {
    db.query(`SELECT title, description FROM stories
              WHERE id = ${req.params.stories_id};`)
      .then(data => {
        const story = data.rows;
        const templateVars = {story : story};
        res.render("storydisplay",templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
});


router.get("/:stories_id/contributions", (req, res) => {
  db.query(`SELECT content,likes,id,story_id FROM contributions
            WHERE story_id = ${req.params.stories_id}`)
  .then(data => {
  let data1 = data['rows'];
  temps = {data:data1};
  res.render("contributions",temps);
  })
  .catch(err => {
  res
  .status(500)
  .json({ error: err.message });
  });
});


router.post("/:stories_id/contributions/:contributions_id", (req, res) => {
  db.query(` SELECT description FROM stories
              WHERE  id = ${req.params.stories_id};`)
  .then(data => {
     let InitialStory = data['rows'][0]['description']
     db.query(`SELECT content, likes FROM contributions
      WHERE  id = ${req.params.contributions_id};`)
     .then(data2 => {
       let StorytoAdd = data2['rows'][0]['content']
       let totalStory  = InitialStory + ' ' + StorytoAdd
       db.query(`UPDATE stories SET description  = '${totalStory}'
              WHERE  id = ${req.params.stories_id};`)
      .then(data3 => {
        db.query(` DELETE FROM contributions 
        WHERE  id = ${req.params.contributions_id};`)
        .then(data4 => {
        res.redirect(`/stories/${req.params.stories_id}`)
        })
      })
    })
  })
  .catch(err => {
  res
  .status(500)
  .json({ error: err.message });
  });
});

router.get("/:stories_id/contributions/:contributions_id/delete", (req, res) => {
  db.query(` DELETE FROM contributions 
              WHERE  id = ${req.params.contributions_id};`)
  .then(data => { console.log('Deleted')  
     res.redirect(`/${req.params.stories_id}/contributions`)
  })
  .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
    });
});

  return router;
};

//UPDATE Employee SET FIRST_NAME=FIRST_NAME+', '+'H' WHERE EMPLOYEE_ID=1
