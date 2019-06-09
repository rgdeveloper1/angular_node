const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const User = require('../../models/user');

router.post('/signup', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(40).json({
                    message: 'Mail exists !!'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "User Created Successfully !!",
                                    user: result
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
});

router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(users => {
            if (users.length < 1) {
                return res.status(401).json({
                    message: 'Mail not found , user doesn\'t exist'
                });
            }
            bcrypt.compare(req.body.password, users[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth Failed Info !!'
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: users[0].email,
                            userId: users[0]._id,
                        },
                        'rgdeveloper',
                        { 
                            expiresIn: "1h"
                        }

                    );
                    console.log(token);
                   return res.status(200).json({
                        message: 'User Login Successfully !!',
                        info: result,
                        token: token,
                        expiresIn: 120
                    });
                } else {
                    return res.status(401).json({
                        message: 'Auth Failed ch !!'
                    });
                }
            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:userId', (req, res, next) => {
    const userID = req.params.userId;
    User.remove({ _id: userID })
        .exec()
        .then(response => {
            res.status(200).json({
                message: 'User Delete Successfully !!'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
                message: 'invalid email'
            });
        });
});

module.exports = router;