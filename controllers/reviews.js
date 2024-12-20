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

xport const createReviews = async (req, res) => {
    try {
        const { menuId, reviews } = req.body;

        // Validasi input
        if (!menuId || !Array.isArray(reviews) || reviews.length === 0) {
            return res.status(400).json({
                status: 400,
                message: "Please provide menuId and an array of reviews.",
            });
        }

        // Validasi rating untuk setiap review
        for (const review of reviews) {
            if (!review.rating || !review.rating.taste || !review.rating.price || !review.rating.presentation) {
                return res.status(400).json({
                    status: 400,
                    message: "Each review must include taste, price, and presentation ratings.",
                });
            }
        }

        // Cari menu terkait
        const menu = await Menu.findById(menuId);
        if (!menu) {
            return res.status(404).json({
                status: 404,
                message: `Menu with id ${menuId} not found.`,
            });
        }

        // Simpan semua review ke database
        const createdReviews = [];
        for (const reviewData of reviews) {
            const newReview = new Review({ menuId, ...reviewData });
            await newReview.save();
            createdReviews.push(newReview);

            // Tambahkan review ke array reviews di menu
            menu.reviews.push(newReview._id);
        }

        // Hitung ulang rating menu berdasarkan semua review
        const allReviews = await Review.find({ menuId });
        const totalTaste = allReviews.reduce((acc, review) => acc + review.rating.taste, 0);
        const totalPrice = allReviews.reduce((acc, review) => acc + review.rating.price, 0);
        const totalPresentation = allReviews.reduce((acc, review) => acc + review.rating.presentation, 0);

        menu.tasteRating = totalTaste / allReviews.length;
        menu.priceRating = totalPrice / allReviews.length;
        menu.presentationRating = totalPresentation / allReviews.length;
        menu.totalReview = allReviews.length;

        // Hitung rating fuzzy
        if (menu.calculateFuzzyRating) {
            menu.calculateFuzzyRating();
        }

        // Simpan perubahan pada menu
        await menu.save();

        res.status(201).json({
            status: 201,
            message: "Successfully created reviews and updated menu ratings.",
            data: createdReviews,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Failed to create reviews.",
            error: error.message,
        });
    }
};