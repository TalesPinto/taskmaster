const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');



// requiring external modules and middlewares
const methodOverride = require('./middlewares/method_override');
const homeController = require('./controllers/home_controller');
const taskController = require('./controllers/task_controller');
const sessionController = require('./controllers/session_controller');
const setCurrentUser = require('./middlewares/set_current_user')
const viewHelpers = require('./middlewares/view_helpers')
const ensureLoggedIn = require('./middlewares/ensure_logged_in')

//............

// setting folders views and public to be used in this project
app.set(express.static('public')); // css to be public for browser proccessing
app.set('view engine', 'ejs'); // ejs
//.............

//using modules and middlewares 
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // body parser - parses req.body
app.use(methodOverride);// must be called after urlencoded
app.use(session({
    secret: process.env.SESSION_SECRET || 'mistyrose',
    resave: false,
    saveUninitialized: true,
}));
app.use(setCurrentUser)
app.use(viewHelpers)
//.............


// routers
app.use('/', homeController);
app.use('/', taskController);
app.use('/', sessionController);


//..............

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
})