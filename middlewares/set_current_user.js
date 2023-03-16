// middleware makes the user logged in available to ejs templates
function setCurrentUser(req, res, next) {
    const db = require('./../db')
    const { userId } = req.session
    res.locals.currentUser = {}

    if (userId) {
        // user is logged in - setup currentUser object
        const sql = `SELECT id, username FROM users WHERE id = ${userId}`

        db.query(sql, (err, dbRes) => {
            if (err) {
                console.log(err)
            } else {
                res.locals.currentUser = dbRes.rows[0] // locals make it available everywhere
                next()
            }
        })
    } else {
        next()
    }
}

module.exports = setCurrentUser
