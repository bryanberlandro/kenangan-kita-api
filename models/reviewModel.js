import mongoose from '../config/db.js';

const ReviewSchema = mongoose.Schema({
    menuId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
        required: true,
    },
    userName: {
        type: String,
        required: true
    },
    rating: {
        taste: {
            type: Number, 
            required: true,
        },
        price: {
            type: Number, 
            required: true,
        },
        presentation: {
            type: Number, 
            required: true,
        },
    },
    comment: {
        type: String,
        required: false,
    },
    reviewDate: {
        type: Date,
        default: Date.now,
    },
})

const Review = mongoose.model('Review', ReviewSchema);
export default Review;