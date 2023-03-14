const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const db = require('./../db')

router.get('/sign_in', (req, res) => {
    res.render('sign_in')
})

router.get('/sign_up', (req, res) => {
    res.render('sign_up')
})

// creating a new user
router.post('/sessions/sign_up', (req, res) => {

    const username = req.body.username
    const plainTextPassword = req.body.password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(plainTextPassword, salt, (err, digestedPassword) => {
            // // the digested password is what we want to save in db
            // console.log(digestedPassword);
            const sql = `INSERT INTO users (username, password_digest) VALUES('${username}', '${digestedPassword}');`

            db.query(sql, (err, dbRes) => {
                console.log(err)
                res.redirect('/sign_in')
            })
        })
    })

})

// creating a new session - logging in
router.post('/sessions/sign_in', (req, res) => {

    const username = req.body.username
    const password = req.body.password

    const sql = `SELECT * FROM users WHERE username = '${username}';`

    console.log(username)
    console.log(password)
    db.query(sql, (err, dbRes) => {

        if (dbRes.rows.length === 0) {
            // if user doesnt exist in the users table go to sign up
            res.render('sign_up')
            return
        }

        const user = dbRes.rows[0]

        bcrypt.compare(password, dbRes.rows[0].password_digest, (err, result) => {
            if (result) {
                // checks password encrypted in the db and compares with the password given
                req.session.userId = user.id
                res.render('dashboard')
            } else {
                res.render('sign_in')
            }
        })

    })
})

// ending an open session - logging out
router.delete('/sessions/sign_out', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

module.exports = router