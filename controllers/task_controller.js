const express = require('express');
const router = express.Router();
const db = require('./../db'); // it opens index.js by default
const ensureLoggedIn = require('./../middlewares/ensure_logged_in')

router.get('/', (req, res) => {
    res.render('home');
})

router.get('/dashboard', ensureLoggedIn, (req, res) => {

    const sql = 'SELECT * FROM tasks WHERE (user_id_assigner = $1) OR (user_id_assignee = $1);'
    db.query(sql, [req.session.userId], (err, dbRes) => {
        let tasks = dbRes.rows // dbRes.rows give us an ARRAY
        // let username = req.session.userId
        res.render('dashboard', { tasks })
    })
})

router.get('/tasks', ensureLoggedIn, (req, res) => {
    console.log(req.session.userId)
    res.render('new_task')
})
// router.get('/tasks/:id', ensureLoggedIn, (req, res) => {

//     // $1, $2, etc...avoid sql injection attack at your db
//     let sql = `SELECT * FROM tasks WHERE user_id_assigner = $1 OR user_id_assignee = $1;`
//     // 
//     db.query(sql, [req.session.userId], (err, dbRes) => {
//         const dish = dbRes.rows[0] // [0] because .rows always returns an ARRAY
//         res.render('dish_details', { dish })
//     })
// })

router.post('/tasks/new', ensureLoggedIn, (req, res) => {

    const sql = `INSERT INTO tasks (title, description, status, comment, user_id_assigner, user_id_assignee) values ($1, $2, $3, $4, $5, $6);`
    //req.body is the query to get info

    db.query(sql, [req.body.title, req.body.description, req.body.status, req.body.comment, req.session.userId, req.body.user_id_assignee], (err, dbRes) => {
        res.redirect('/dashboard')
    })
})



module.exports = router;