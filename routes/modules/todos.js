const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo

// Create
router.get('/new', (req, res) => {
    return res.render('new')
})
router.post('/', (req, res) => {
    const userId = req.user.id
    const name = req.body.name
    return Todo.create({
        name: name,
        UserId: userId,
        createdAt: new Date(),
        updatedAt: new Date()
    })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})


// Details
router.get('/:id', (req, res) => {
    const id = req.params.id
    return Todo.findByPk(id)
        .then(todo => res.render('detail', { todo: todo.toJSON() }))
        .catch(error => console.log(error))
})

// Edit
router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    return Todo.findByPk(id)
        .then(todo => res.render('edit', { todo: todo.toJSON() }))
        .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
    const id = req.params.id
    const { name, isDone } = req.body
    return Todo.findByPk(id)
        .then(todo => {
            todo.name = name
            todo.isDone = isDone === 'on'
            return todo.save()
        })
        .then(() => res.redirect(`/todos/${id}`))
        .catch(error => console.log(error))
})

// Delete
router.delete('/:id', (req, res) => {
    const id = req.params.id
    return Todo.findByPk(id)
        .then(todo => todo.destroy())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})



module.exports = router