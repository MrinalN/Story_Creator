  
let FindUserObject = function(cookieId) {
    let userSignedInObject;
    for (let id in users) {
        if (cookieId === id) {
        userSignedInObject = users[id];
        return userSignedInObject;
        }
    }
    return;
};
  
let CheckDatabaseForEmails = function (email) {
    let array = Object.values(users);

    for (let i = 0; i < array.length; i++) {
        if (array[i]['email'] === email) {
        return true;
        }
    }
    return false;
}

const FindUserByEmail = function(email,users) {
    let array=Object.values(users)
    for (let i = 0 ; i < array.length; i++){
        if (array[i].email === email){
        console.log(array[i])
        return array[i];
        }
    }
    return false;
}

module.exports = { FindUserObject, CheckDatabaseForEmails, FindUserByEmail}