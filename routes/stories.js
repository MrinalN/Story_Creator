const express = require('express');
const router  = express.Router();

module.exports  = (db) => {

// PRINTS TITLE LIST TO MAIN PAGE
router.get("/", (req, res) => {
    db.query(`SELECT title, description, created_at, publish_date, users.name,stories.id FROM stories
              JOIN users ON users.id = creator_id;`)
    .then(data => {
    const data1 = data.rows;
    const templateVars = { StoriesDB : data1};
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
    db.query(`SELECT title, description, id as story_id, creator_id FROM stories
              WHERE id = ${req.params.stories_id};`)
      .then(data => {
        const story = data.rows;
        console.log(story)
        let user = req.session.user_id
        console.log(user)
        const templateVars = {story : story,
                              user :user};
        res.render("stories_id",templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
});

router.post("/:stories_id/publish", (req, res) => {
  db.query(`UPDATE stories
            SET publish_date = '2020-05-12T08:00:00.000Z'
            WHERE id = ${req.params.stories_id};`)
    .then(data => {
      res.redirect('/stories');
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post("/:stories_id/AddToContribution", (req, res) => {
  let user_id = req.session.user_id
    db.query(`INSERT INTO contributions (story_id, contributor_id, content, created_at)
              VALUES(${req.params.stories_id},${user_id},'${req.body.story}','2020-05-12T08:00:00.000Z')
              RETURNING *;`)
      .then(data => {
        res.redirect(`/stories/${req.params.stories_id}/contributions`);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
});



router.get("/:stories_id/contributions", (req, res) => {
  db.query(`SELECT content, contributions.created_at,contributions.story_id,
            users.name, title, creator_id, contributions.id as contribution_id
            FROM contributions
            JOIN users ON users.id = contributor_id
            JOIN stories ON story_id = stories.id
            WHERE story_id = ${req.params.stories_id}`)
  .then(data => {
    let userid = req.session.user_id;
    let data1 = data['rows'];
    db.query(`SELECT COUNT(id) as likes,contribution_id FROM likes_table
              GROUP BY contribution_id;`)
    .then(data2 => {
      let likes = data2['rows']
      for (let con_params of data1) {
        for (let like of likes) {
          if(con_params['contribution_id'] === like['contribution_id']) {
            con_params['likes'] =  like['likes']
         }
        }
      }
      temps = { data : data1, SignedInUser : userid};
      console.log(data1)
      res.render("contributions",temps);
    })
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
     db.query(`SELECT content FROM contributions
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

router.post("/:stories_id/contributions/:contributions_id/delete", (req, res) => {
  db.query(` DELETE FROM contributions
              WHERE  id = ${req.params.contributions_id};`)
  .then(data => { console.log('Deleted')
     res.redirect(`/stories/${req.params.stories_id}/contributions`)
  })
  .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
    });
});

//THIS IS TO ADD TO THE LIKES TABLE
// test with req.session.req.session.user_id NOT DONE WITHOUT LOGINNNNNNNNNNNNNNNN
router.post("/:stories_id/contributions/:contributions_id/likes", (req, res) => {
  db.query(`INSERT INTO like_table (contribution_id,user_id)
            VALUES(${req.params.contributions_id},1)
            RETURNING *;`)
  .then(data => {
    res.redirect(`/stories/${req.params.stories_id}/contributions`)
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
