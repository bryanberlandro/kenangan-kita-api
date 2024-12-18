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

export const createReview = async(req, res) => {
    try {
        const { menuId, rating } = req.body;

        if(!rating.taste || !rating.price || !rating.presentation){
            return res.status(400).json({
                status: 400,
                message: "please fill in all these reviews"
            })
        }

        const newReview = new Review({
            menuId,
            rating,
            ...req.body
        })

        await newReview.save()

        const menu = await Menu.findById(menuId);

        // Tambahkan review ke array reviews dalam menu
        menu.reviews.push(newReview._id);

        // Perbarui rating menu berdasarkan review
        const reviews = await Review.find({ menuId });
        const totalRasa = reviews.reduce((acc, review) => acc + review.rating.taste, 0);
        const totalHarga = reviews.reduce((acc, review) => acc + review.rating.price, 0);
        const totalPenyajian = reviews.reduce((acc, review) => acc + review.rating.presentation, 0);

        menu.tasteRating = totalRasa / reviews.length;
        menu.priceRating = totalHarga / reviews.length;
        menu.presentationRating = totalPenyajian / reviews.length;
        menu.totalReview = reviews.length;

        // Hitung total penilaian menggunakan fuzzy
        menu.calculateFuzzyRating();

        // Simpan perubahan menu ke database
        await menu.save();

        res.status(201).json({
            status: 201,
            message: "Successfully created review",
            data: newReview
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Failed to create review",
            error: error.message
        })
    }
}