import Menu from "../models/menuModel.js";
import Review from "../models/reviewModel.js"

export const getAllReviews = async(req, res) => {
    try {
        const reviews = await Review.find();

        if(reviews.length === 0){
            return res.status(404).json({
                status: 404,
                message: "No reviews found",
                data_length: reviews.length,
            })
        }

        res.status(200).json({
            status: 200,
            message: "Successfully get all reviews",
            data: reviews,
            data_length: reviews.length
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Failed to get all reviews",
            error: error.message
        })
    }
}

export const createReview = async (req, res) => {
    try {
        const { menuId, rating, ...otherData } = req.body;

        if (!menuId || !rating || !rating.taste || !rating.price || !rating.presentation) {
            return res.status(400).json({
                status: 400,
                message: "Please provide menuId and all required rating fields (taste, price, presentation).",
            });
        }

        const menu = await Menu.findById(menuId);
        if (!menu) {
            return res.status(404).json({
                status: 404,
                message: `Menu with id ${menuId} not found.`,
            });
        }

        const newReview = new Review({
            menuId,
            rating,
            ...otherData,
        });
        await newReview.save();

        menu.reviews.push(newReview._id);

        const reviews = await Review.find({ menuId });
        const totalTaste = reviews.reduce((acc, review) => acc + review.rating.taste, 0);
        const totalPrice = reviews.reduce((acc, review) => acc + review.rating.price, 0);
        const totalPresentation = reviews.reduce((acc, review) => acc + review.rating.presentation, 0);

        menu.tasteRating = totalTaste / reviews.length;
        menu.priceRating = totalPrice / reviews.length;
        menu.presentationRating = totalPresentation / reviews.length;
        menu.totalReview = reviews.length;

        if (menu.calculateFuzzyRating) {
            menu.calculateFuzzyRating();
        }

        await menu.save();

        res.status(201).json({
            status: 201,
            message: "Successfully created review and updated menu ratings.",
            data: newReview,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Failed to create review.",
            error: error.message,
        });
    }
};