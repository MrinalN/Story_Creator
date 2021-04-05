const express = require('express');
const router  = express.Router();


const bcrypt = require('bcrypt');



module.exports  = (db) => {

router.get("/", (req, res) => {
  const templateVars = {};
  res.render("login",templateVars);
});

router.post("/", (req, res) => {
  db.query(`SELECT * FROM users
    WHERE email = '${req.body.email}'`)
    .then(data => {   
      console.log(data['rows'])
      if (data['rows'].length < 1) {
        res.status(403).send('Error: 404 Email does not exist');
      } else if (bcrypt.compareSync(req.body.password,data['rows'][0]['password'])) {
        req.session.user_id = data['rows'][0]['id'];
        res.redirect('/stories');
      } else {
        res.status(403).send('Error: 404 Password does not match');
      }
    })
    .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
    });
});

  return router;
};
