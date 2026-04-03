import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    category: String,
    price: Number,
    images: [String],
    uploadedBy: String,
    createdOn: { type: String, default: Date.now().toString() }
});

export default mongoose.model('Product', productSchema);