const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports  = (db) => {

router.get("/", (req, res) => {
    const templateVars = {};
    res.render("register",templateVars);
});

router.post("/", (req, res) => {
  let password = req.body.password;
  let hashedPassword = bcrypt.hashSync(password, 10);
  console.log(req.body)

  if (req.body.email === '' || req.body.password === '' || req.body.username === '') {
    res.status(404).send('Error: 404 Username, Email or Password empty');
  } else {
    db.query(`SELECT email, password FROM users;`)
    .then(data => {
        let userobj = data['rows']
        for (let user of userobj ) {
          if (user.email === req.body.email) {
            res.status(404).send('Email already exists');
          } 
        }  
        db.query(`INSERT INTO users (name, email, password, creator_status)
        VALUES ('${req.body.username}', '${req.body.email}','${hashedPassword}', 't') 
        RETURNING *;`)
        .then(data1 => {   
        req.session.user_id = data1['rows'][0]['id'];
        res.redirect(`/stories`)
      })
      .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
      });
    })
  }
});

  return router;
};
