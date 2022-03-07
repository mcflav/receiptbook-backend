const express = require('express');
const {Receipt, User, validate} = require('../models/receiptModel');
const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/userReceipts', auth, async(req,res) => {
    const user = await User.find();
    const userReceipts = req.body.user;

    let orderFound = false;

    for(i = 0; i < user.length; i++) {
        if(user[i]._id == userReceipts) {
            orderFound = true;
        }
    }

    if(orderFound === false) {
        return res.status(404).send('There are no receipts for this account!');
    } else {
        const receipts = await Receipt.find({user: userReceipts});
        res.send(receipts);
    }
})

router.post('/receiptsByEmail', async(req,res) => {
    const receipts = await Receipt.find();
    console.log(receipts);
    const email = req.body.email;

    let orderFound = false;

    for(i = 0; i < receipts.length; i++) {
        console.log("email" + receipts[i].email)
        if(receipts[i].email == email) {
            orderFound = true;
        }
    }
    console.log("orderfound: " + orderFound);

    if(orderFound === false) {
        return res.status(404).send('There are no receipts for this account!');
    } else {
        const receipts = await Receipt.find({email: email});
        res.send(receipts);
    }
})

router.get('/', auth, async (req,res) => {
    const receipt = await Receipt.find().sort('receiptDate');
    res.send(receipt);
});

router.get('/:id', auth, validateObjectId, async (req,res) => {
    const receipt = await Receipt.findById(req.params.id);
    res.send(receipt);
});

router.post('/', auth, async (req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let receipt = new Receipt({receiptDate: req.body.receiptDate, receivedFrom: req.body.receivedFrom, amount: req.body.amount,
        paymentOf: req.body.paymentOf, paymentType: req.body.paymentType, signature: req.body.signature, email: req.body.email,
        user: req.body.user });
    receipt = await receipt.save();
    res.send(receipt);
});

router.put('/:id', auth, validateObjectId, async (req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const receipt = await Receipt.findByIdAndUpdate(req.params.id, req.body);
    res.send(receipt);
});

router.delete('/:id', auth, validateObjectId, async (req,res) => {
    const receipt = await Receipt.findByIdAndRemove(req.params.id);
    res.send(receipt);
});

module.exports = router;