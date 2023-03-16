// allows the user only to access a page if its logged in
function ensureLoggedIn(req, res, next) {
    if (req.session.userId) {
        return next()
    }
    res.redirect('/sign_in')
}

module.exports = ensureLoggedIn

