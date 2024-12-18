import mongoose from "../config/db.js";

const MenuSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    tasteRating: {
        type: Number,
        default: 0
    },
    priceRating: {
        type: Number,
        default: 0
    },
    presentationRating: {
        type: Number,
        default: 0
    },
    totalRating: {
        type: Number,
        default: 0
    },
    totalReview: {
        type: Number,
        default: 0
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

MenuSchema.methods.calculateFuzzyRating = function () {
    const rasaWeight = 0.4;  
    const hargaWeight = 0.3; 
    const penyajianWeight = 0.3;

    this.totalRating = (this.tasteRating * rasaWeight) + 
                           (this.priceRating * hargaWeight) + 
                           (this.presentationRating * penyajianWeight);
    
    return this.totalRating;
};

const Menu = mongoose.model('Menu', MenuSchema)
export default Menu;