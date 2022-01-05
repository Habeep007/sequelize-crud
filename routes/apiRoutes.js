const express = require('express');
const router = express.Router();
const db = require('../models');

//get all records
router.get('/all', (req, res) => {
    db.todo.findAll().then(todos => res.send(todos));
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
router.delete('/delete/:id', (req, res) => {
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
router.delete('/bulkdelete/:id1/:id2/:id3', (req, res) => {
    let ids =  req.params;
    db.todo.destroy(
        {
            where: { id: [ids.id1, ids.id2, ids.id3]}
        }
    ).then(() => res.send('deleted bulk successfully'));
});

//bulk update request
router.put('/bulkupdate', (req, res) => {
    let ids =  req.body;
    db.todo.update({text: req.body.text},
        {
            where: {
              id: [req.body.id1, req.body.id2, req.body.id3]
            }
        }
    ).then(() => {res.send('updated in bulk successfully')});
});

module.exports = router;