const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer =  require('multer');
// const upload = multer({dest: '../../'});
const Product = require('../../models/products');

router.get('/', (req, res, next) => {
    Product.find()
        .select('name price _id')
        .exec()
        .then(result => {
            console.log(result);
            const response = {
                count: result.length,
                products: result.map(
                    (doc) =>{
                        return {
                             name: doc.name,
                             price: doc.price,
                             _id: doc._id,
                             request: {
                                 type: 'GET',
                                 url: 'http://localhost:3000/products/' + doc._id
                             }
                        };
                    }
                )
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Create Product Successfully !!',
                product: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    resquest: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + result._id
                    }
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

router.get('/:productId', (req, res, nex) => {
    const id = req.params.productId;

    Product.findById(id)
        .then(doc => {
            console.log('From Databse', doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(500).json({
                    message: 'No Valid Entry found for this provided ID'
                });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

router.patch('/:productId', (req, res, nex) => {
    const id = req.params.productId;
    const udpateOpp = {};
    for (const ops of req.body) {
        udpateOpp[ops.productCategory] = ops.value;
    }
    Product.update({ _id: id }, { $set: udpateOpp })
        .exec()
        .then(result => {
            console.log('Update', result);
            res.status(200).json({
                result: result,
                message: 'Product Update Successfully !!'
            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:productId', (req, res, nex) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(del => {
            console.log('Delete Product', del);
            res.status(200).json(del);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});



module.exports = router;