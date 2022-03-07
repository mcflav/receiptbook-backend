const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    firstname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    lastname: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
});

const User = mongoose.model('User', userSchema);

const receiptSchema = mongoose.Schema({
    receiptDate: {
        type: String,
        required: true
    },
    receivedFrom: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    amount: {
        type: Number,
        required: true
    },
    paymentOf: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    paymentType: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 7
    },
    signature: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Receipt = mongoose.model('Receipt', receiptSchema);

function validateUsers(users) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        firstname: Joi.string().min(3).max(255).required(),
        lastname: Joi.string().min(3).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    };
        return Joi.validate(users, schema);
}

function validateReceipt(receipt) {
    const schema = {
        receiptDate: Joi.string().required(),
        receivedFrom: Joi.string().min(2).max(255).required(),
        amount: Joi.number().required(),
        paymentOf: Joi.string().min(3).max(255).required(),
        paymentType: Joi.string().min(4).max(7).required(),
        signature: Joi.string().min(2).max(255).required(),
        email: Joi.string().min(5).max(255).required(),
        user: Joi.objectid().required()
    };
        return Joi.validate(receipt, schema);
}

exports.Receipt = Receipt;
exports.validate = validateReceipt;
exports.User = User;
exports.validateUsers = validateUsers;