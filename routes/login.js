const express = require('express');
const router  = express.Router();



module.exports  = (db) => {

    router.get("/", (req, res) => {
    const templateVars = {};
    res.render("login",templateVars);
});

  return router;
};