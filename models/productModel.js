const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: {type: String , required: true}, 
    image: {type: String , required: true}, 
    category:  {type: String , required: true}, 
    price: {type: Number , required: true },  
    countInStock: {type: Number , required: true , default: 0}, 
    rating: {type: Number , required: true , default: 0},  
    description: {type: String , required: true}
}); 

const productModel = mongoose.model("Product" , productSchema);
module.exports = productModel ;
