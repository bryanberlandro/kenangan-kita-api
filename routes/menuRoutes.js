import express from 'express';
import { createMenu, getAllMenu, getMenuByCategory, searchMenuByName } from '../controllers/menu.js';
const menuRouter = express.Router();

menuRouter.post('/create-menu', createMenu);
menuRouter.get('/menus', getAllMenu)
menuRouter.get('/menus/category/:category', getMenuByCategory)
menuRouter.get('/menus/search', searchMenuByName)

export default menuRouter;