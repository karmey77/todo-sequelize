const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo

router.get('/', (req, res) => {
    const userId = req.user.id   // 變數設定
    return Todo.findAll({
        where: {UserId : userId},
        raw: true,
        nest: true
    })
        .then((todos) => { return res.render('index', { todos: todos }) })
        .catch((error) => { return res.status(422).json(error) })
})

module.exports = router