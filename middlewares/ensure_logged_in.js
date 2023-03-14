// allows the user only to access a page if its logged in

function ensureLoggedIn(req, res, next) {
    if (req.session.userId) {
        return next()
    }
    res.redirect('/login')
}

module.exports = ensureLoggedIn

