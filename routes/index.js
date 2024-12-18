import express from 'express';
import tableRouter from './tableRoutes.js';
import orderRouter from './orderRoutes.js';
import menuRouter from './menuRoutes.js';
import reviewRouter from './reviewRoutes.js';
const router = express.Router();

router.use(tableRouter)
router.use(orderRouter)
router.use(menuRouter)
router.use(reviewRouter)

export default router