import express from 'express';
import { createReview, getAllReviews } from '../controllers/reviews.js';
const reviewRouter = express.Router();

reviewRouter.get('/reviews', getAllReviews);
reviewRouter.post('/create-review', createReview);

export default reviewRouter;