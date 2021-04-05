const express = require('express');
const router  = express.Router();

module.exports  = (db) => {

router.get("/", (req, res) => {
    db.query(`SELECT content,likes,id FROM contributions`)
    .then(data => {      
    let data1 = data['rows'];
    console.log(data1)
    const templateVars = {data : data1};
    res.render("contributions",templateVars);
    })
    .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
    });
});

router.post("/", (req, res) => {
    console.log(res.body)
    db.query(` SELECT description FROM stories
                WHERE id =  
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

// UPDATE Employee SET FIRST_NAME=FIRST_NAME+', '+'H' WHERE EMPLOYEE_ID=1 