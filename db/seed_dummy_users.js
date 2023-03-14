const db = require('./../db')
const bcrypt = require('bcrypt')


const username = 'tales'
const plainTextPassword = 'pudding'

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(plainTextPassword, salt, (err, digestedPassword) => {
        // // the digested password is what we want to save in db
        // console.log(digestedPassword);
        const sql = `INSERT INTO users (username, password_digest) VALUES('${username}', '${digestedPassword}');`

        db.query(sql, (err, dbRes) => {
            console.log(err)
        })
    })

})