const express = require('express');
const router  = express.Router();


const FindContentByID =(array,contributions_id) =>{
  for( let obj of array) {
     if (obj['id'] === contributions_id) {
       return obj['content']
     }
  }
}

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
        res.render("story",templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
});

// global temp so we can use the data in the query below aswell
let temps = {}

router.get("/:stories_id/contributions", (req, res) => {
  db.query(`SELECT content,likes,id,story_id FROM contributions
            WHERE story_id = ${req.params.stories_id}`)
  .then(data => {
  let data1 = data['rows'];
  temps = {data:data1};
  console.log(temps)
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
     let ToAddStory = FindContentByID(req.params.contributions_id)
     console.log(InitialStory)
     console.log(temps,req.params.contributions_id)
     console.log(temps)
     console.log(ToAddStory)
  //    db.query(`UPDATE stories SET description  = '${InitialStory}' + ' ' + '${temps['data']['content']}'
  //             WHERE  id = ${req.params.stories_id};`)
  //   .then(data2 => {
  //     res.redirect(`/stories/${req.params.stories_id}`)
  //    })
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
