// parses req.body to be used in the code (POST and DELETE now is possible to be used)
const methodOverride = require('method-override')

const fn = methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
})

module.exports = fn;