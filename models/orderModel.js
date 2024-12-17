import mongoose from "../config/db.js";

const OrderSchema = mongoose.Schema({
    table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true },
    customerName: { type: String, required: true },
    items: [
        {
        menu: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
        quantity: { type: Number, required: true },
        },
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Served', 'Paid'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
})

const Order = mongoose.model('Order', OrderSchema);
export default Order;