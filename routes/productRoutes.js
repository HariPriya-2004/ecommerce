import express from 'express';
import {
    add_product,
    get_products,
    update_product,
    delete_product
} from '../controllers/productController.js';

const router = express.Router();

router.post('/add_product', add_product);
router.get('/get_products', get_products);
router.put('/update_product/:id', update_product);
router.delete('/delete_product/:id', delete_product);

export default router;