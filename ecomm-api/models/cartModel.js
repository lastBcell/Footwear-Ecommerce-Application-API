const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
    cartItems: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to Product
            quantity: { type: Number, required: true, default: 1 },
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);
