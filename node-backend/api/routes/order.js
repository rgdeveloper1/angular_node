const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../../models/order');
const Product = require('../../models/products');

router.get('/', (req, res, next) => {
    Order.find()
        .select('product quantity _id')
        .populate('product')
        .exec()
        .then(
            (docs) => {
                console.log(docs);
                res.status(200).json({
                    messag: 'Order Fetch Successfully !!',
                    count: docs.length,
                    orders: docs.map(res => {
                        return {
                            _id: res._id,
                            product: res.product,
                            quantity: res.quantity,
                            request: {
                                type: 'GET',
                                url: 'localhost:3000/orders/' + res._id
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
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: 'product not found !!'
                });
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                product: req.body.productId,
                quantity: req.body.quantity
            });
            return order.save();
        })
        .then(
            (result) => {
                console.log(result);
                res.status(201).json({
                    message: "order create successfully",
                    order: result,
                    request: {
                        type: 'GET',
                        url: 'localhost:3000/orders/' + result._id
                    }
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

router.get('/:orderId', (req, res, next) => {
    Order.findById(req.params.orderId)
    .populate('product')
    .exec()
    .then(orders => {
        if(!orders){
          return  res.status(404).json({
                message: "Order not found !!"
            });
        }
        res.status(200).json({
            message: 'Order Fetch By id Successfully !!',
            order: orders,
            request: {
                type: 'GET',
                url: "http://localhost:3000/orders"
            }

        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:orderId', (req, res, next) => {
    Order.remove({_id : req.params.orderId })
    .exec()
    .then(order => {
        res.status(200).json({
            message: 'Sucessfullly Deleted !!',
            // order: order,
            request: {
                type: 'GET',
                url: "localhost:3000/orders",
                body: {

                }
            }
        });
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;