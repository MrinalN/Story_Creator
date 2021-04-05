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

  if (req.body.email === '' || req.body.password === '') {
    res.status(404).send('Error: 404 Email or Password empty');
  } else {
    db.query(`INSERT INTO users (name, email, password, creator_status)
    VALUES ('${req.body.name}', '${req.body.email}','${hashedPassword}', 't') 
    RETURNING *;`)
    .then(data => {   
      req.session.user_id = data['rows'][0]['id'];
      res.redirect(`/stories`)
    })
    .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
    });
  }
});

  return router;
};
