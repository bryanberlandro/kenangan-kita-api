import mongoose from "../config/db.js";

const OrderSchema = mongoose.Schema({
    table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true },
    customerName: { type: String, required: true },
    orders: [
        {
        menu: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
        quantity: { type: Number, required: true },
        },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Served', 'Paid'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
})

const Order = mongoose.model('Order', OrderSchema);
export default Order;