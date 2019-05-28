const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../../models/order');

router.get('/', (req, res, next) => {
   Order.find()
   .select('product quantity _id')
   .exec()
   .then(
       (docs) => {
           console.log(docs);
           res.status(200).json({
               messag: 'Order Fetch Successfully !!',
               count: docs.length,
               order: docs.map(res => {
                   return {
                       product: res.product,
                       quantity: res.quantity,
                    request: {
                        type: 'GET',
                        url: 'localhost:3000/orders/'+ res._id
                    }
                   };
               })
               
           });
       }
   )
   .catch(err => {
       console.log(err);
       res.status(500).json({
           err: err
       });
   });
});

router.post('/', (req, res, next) => {
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity
    });
    order
    .save()
    .then(
        (result) => {
            console.log(result);
            res.status(201).json({
                message: "order create successfully",
                order: result
            });
        }
    )
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/orderId', (req, res, next) => {
    res.status(201).json({
        message: 'Order Details !!',
        id: req.params.orderId
    });
});

router.delete('/orderId', (req, res, next) => {
    res.status(201).json({
        message: 'Order DELEET Successfully !!',
        id: req.params.orderId
    });
});

module.exports = router;