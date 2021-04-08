const GetUserData = (useremail) => {
    db.query(`SELECT * FROM users
                WHERE  email = '${useremail}';`)
    .then(data => { 
      console.log(data.rows)
      return data.rows
    })
    .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
    });
}

module.exports = {GetUserData}