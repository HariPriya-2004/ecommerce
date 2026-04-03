import Product from '../models/Product.js';

export const add_product = async (req, res) => {
    try {
        const product = new Product(req.body);

        await product.save();

        res.status(201).json({
            status: true,
            message: "Product added",
            data: product
        });

    } catch (err) {
        res.status(500).json({ status: false, error: err.message });
    }
};
export const get_products = async (req, res) => {
    try {
        const products = await Product.find();

        res.json({
            status: true,
            data: products
        });

    } catch (err) {
        res.status(500).json({ status: false, error: err.message });
    }
};
export const update_product = async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            status: true,
            message: "Product updated",
            data: updated
        });

    } catch (err) {
        res.status(500).json({ status: false, error: err.message });
    }
};
export const delete_product = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);

        res.json({
            status: true,
            message: "Product deleted"
        });

    } catch (err) {
        res.status(500).json({ status: false, error: err.message });
    }
};