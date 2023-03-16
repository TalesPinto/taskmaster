const express = require('express');
const router = express.Router();
const db = require('./../db'); // it opens index.js by default
const ensureLoggedIn = require('./../middlewares/ensure_logged_in')


// website home (sign in/sign up)
router.get('/', (req, res) => {
    res.render('home');
})

// users dashboard (ready only) - only accessible if an user is logged in (ensureLoggedIn)
router.get('/dashboard', ensureLoggedIn, (req, res) => {

    const sql = 'SELECT * FROM tasks WHERE (user_id_assigner = $1) OR (user_id_assignee = $1) ORDER BY id ASC;'
    db.query(sql, [req.session.userId], (err, dbRes) => {
        let tasks = dbRes.rows // dbRes.rows give us an ARRAY
        res.render('dashboard', { tasks })
    })
})

// user dashboard (edit and delete) ONLY the task choosen
router.get('/dashboard/:task_id', ensureLoggedIn, (req, res) => {

    const sql = 'SELECT * FROM tasks WHERE (user_id_assigner = $1) OR (user_id_assignee = $1) ORDER BY id ASC;'
    db.query(sql, [req.session.userId], (err, dbRes) => {
        let tasks = dbRes.rows // dbRes.rows give us an ARRAY
        let taskId = req.params.task_id
        console.log(req.params.task_id)
        res.render('dashboard_edit', { tasks, taskId })
    })
})

// renders the new task page - only accessible if an user is logged in (ensureLoggedIn)
router.get('/tasks', ensureLoggedIn, (req, res) => {
    console.log(req.session.userId)
    res.render('new_task')
})

// inserts a new task into db - only accessible if an user is logged in (ensureLoggedIn)
router.post('/tasks/new', ensureLoggedIn, (req, res) => {

    const sql = `INSERT INTO tasks (title, description, status, comment, user_id_assigner, user_id_assignee) values ($1, $2, $3, $4, $5, $6);`

    db.query(sql, [req.body.title, req.body.description, req.body.status, req.body.comment, req.session.userId, req.body.user_id_assignee], (err, dbRes) => {
        res.redirect('/dashboard')
    })
})

// updates an existing task in db
router.put('/tasks', (req, res) => {
    const sql = `UPDATE tasks SET title = $1, description = $2, comment = $3, status = $4, user_id_assigner = $5 WHERE id = $6;`
    // console.log(req.body.title)
    // console.log(req.body.id)
    db.query(sql, [req.body.title, req.body.description, req.body.comment, req.body.status, req.body.user_id_assigner, req.body.id], (err, dbRes) => {
        if (err) {
            console.log(err)
        } else {
            // console.log(req.body.title)
            res.redirect(`/dashboard`)
        }
    })
})

// deletes an existing task in db
router.delete('/tasks/:task_id', (req, res) => {
    console.log('cp1')
    console.log(req.params.task_id)
    const sql = `DELETE FROM tasks WHERE id = $1;`
    db.query(sql, [req.params.task_id], (err, dbRes) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect(`/dashboard`)
        }
    })
})


module.exports = router;