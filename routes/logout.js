const express = require('express');
const router  = express.Router();


module.exports  = (db) => {

  router.post("/logout", (req, res) => {
    req.session.user_id = null;
    res.redirect('/login');
    });

  return router;
};