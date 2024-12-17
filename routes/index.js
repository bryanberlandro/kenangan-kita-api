import express from 'express';
import tableRouter from './tableRoutes.js';
const router = express.Router();

router.use(tableRouter)

export default router