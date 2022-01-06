const express = require('express');
const router = express.Router();
const db = require('../models');
const authorize = require('../middleware');

//router.use(authorize);

//get all records
router.get('/all', (req, res, next) => {
    db.todo.findAll().then(todos => res.send(todos));
    console.log(req.body);
});

//get single record by id
router.get('/find/:id', (req, res) => {
    db.todo.findAll({
        where: {
            id: req.params.id
        }
    }).then((todos) => {
        res.send(todos)
    });
});

//post request
router.post('/new', (req, res) => {
    db.todo.create({
        text: req.body.text
    }).then((newRecord) => {
        res.send(newRecord);
    });
});

// delete request
router.delete('/delete/:id', authorize, (req, res) => {
    db.todo.destroy({
        where: {
            id: req.params.id,
        }
    }).then(() => {
        res.send('deleted successfully');
    });
});

//update request
router.put('/edit', (req, res) => {
    db.todo.update(
        {
            text: req.body.text
        },
        {
            where: {id: req.body.id}
        }
    ).then(() => res.send('updated successfully'));
});

//bulk delete request
router.delete('/bulkdelete/:id1/:id2/:id3', authorize, (req, res) => {
    let ids = [];
    for(let id in req.params){
        ids.push(req.params[id])
    }
    db.todo.destroy(
        {
            where: { id: ids }
        }
    ).then(() => res.send('deleted bulk successfully'));
});

//bulk update request
router.put('/bulkupdate', (req, res) => {
    let ids = [];
    for(let id in req.body){
        console.log(id, (id != req.body.text))
        if(id != 'text'){
        ids.push(req.body[id])
        }
        console.log(ids);
    }
    db.todo.update({text: req.body.text},
        {
            where: {
            id : ids
            }
        }
    ).then(() => {res.send('updated in bulk successfully')});
});

module.exports = router;