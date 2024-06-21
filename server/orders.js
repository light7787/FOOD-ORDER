// const express = require('express');
// const router = express.Router();
// const Order = require('./order')

// // Get all orders
// router.get('/', async (req, res) => {
//     try {
//         const orders = await Order.find();
//         res.json(orders);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Create new order
// router.post('/', async (req, res) => {
//     const newOrder = new Order(req.body);
//     try {
//         const savedOrder = await newOrder.save();
//         res.status(201).json(savedOrder);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// module.exports = router;
