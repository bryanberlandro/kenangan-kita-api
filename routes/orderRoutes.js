import express from 'express';
import { createOrder, deleteOrder, getAllOrders, getOrderByTable, getTotalIncome, updateOrderStatus } from '../controllers/orders.js';
const orderRouter = express.Router()

orderRouter.get('/orders', getAllOrders)
orderRouter.get('/order-table', getOrderByTable)
orderRouter.get('/total-income', getTotalIncome)
orderRouter.post('/create-order', createOrder)
orderRouter.put('/update-order', updateOrderStatus)
orderRouter.delete('/delete-order', deleteOrder)

export default orderRouter;