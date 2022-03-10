const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const {User, validateUsers} = require('../models/receiptModel');
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');

router.get('/', async (req,res) => {
    const users = await User.find().sort('firstname');
    res.send(users);
});

router.get('/:id', [auth, validateObjectId], async (req,res) => {
    const user = await User.findById(req.params.id);
    res.send(user);
});

router.post('/', async (req,res) => {
    const {error} = validateUsers(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = new User({email: req.body.email, firstname: req.body.firstname, lastname: req.body.lastname, password: req.body.password});
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();
    res.send(user);
});

router.put('/:id', [auth, validateObjectId], async (req,res) => {
    const {error} = validateUsers(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.send(user);
});

router.delete('/:id', [auth, validateObjectId], async (req,res) => {
    const user = await User.findByIdAndRemove(req.params.id);
    res.send(user);
});

module.exports = router;