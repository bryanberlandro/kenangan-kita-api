import mongoose from "../config/db.js";

const TableSchema = mongoose.Schema({
    "tableId": {
        type: String,
        unique: true
    },
    "status": {
        type: String,
        enum: ['Available', 'Occupied'],
        default: 'Available'
    },
    "currentOrder": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        default: null
    }
})

const Table = mongoose.model('Table', TableSchema);
export default Table;