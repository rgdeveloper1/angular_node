const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String},
    price: {type: Number, required: true},
    // productImage: {type: String, required: true}
});


module.exports = mongoose.model('products', productSchema);