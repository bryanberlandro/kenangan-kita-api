import express from 'express';
import { addTable, getAllTables } from '../controllers/tables.js';
const tableRouter = express.Router();

tableRouter.get('/tables', getAllTables)
tableRouter.post('/add-table', addTable)

export default tableRouter;