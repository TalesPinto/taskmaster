const express = require('express');
const app = express();
const port = 3000;
const expressLayouts = require('express-ejs-layouts');

// require modules and middlewares
const methodOverride = require('./middlewares/method_override');
const taskController = require('./controllers/task_controller')

//............

app.set(express.static('public'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // body parser - parses req.body
app.use(methodOverride);// must be called after urlencoded

app.use('/', taskController)

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
})