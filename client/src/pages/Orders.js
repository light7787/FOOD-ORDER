import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [foodItem, setFoodItem] = useState('');
    const [foodItems, setFoodItems] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchOrders();
        fetchFoodItems();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get('food-order-vert-kappa.vercel.app/orders');
            setOrders(res.data);
        } catch (err) {
            console.error('Failed to fetch orders:', err);
        }
    };

    const fetchFoodItems = async () => {
        try {
            const res = await axios.get('food-order-vert-kappa.vercel.app/food-items');
            setFoodItems(res.data);
        } catch (err) {
            console.error('Failed to fetch food items:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const selectedFoodItem = foodItems.find(item => item.name === foodItem);
            if (!selectedFoodItem) {
                throw new Error('Selected food item not found');
            }
            const newOrder = {
                customerName,
                foodItem,
                totalAmount: selectedFoodItem.price
            };
            const res = await axios.post('food-order-vert-kappa.vercel.app/orders', newOrder);
            setOrders([...orders, res.data]);
            setCustomerName('');
            setFoodItem('');
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.error || err.message);
            } else {
                setError('Failed to place order');
            }
            console.error('Order submission error:', err);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8 text-center">Orders</h1>

            <form onSubmit={handleSubmit} className="mb-8">
                <div className="flex flex-col mb-4 md:flex-row md:items-center md:space-x-4">
                    <div className="flex-1">
                        <label className="block text-gray-700 mb-2">Customer Name</label>
                        <input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-gray-700 mb-2">Food Item</label>
                        <select
                            value={foodItem}
                            onChange={(e) => setFoodItem(e.target.value)}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                            required
                        >
                            <option value="" disabled>Select a food item</option>
                            {foodItems.map(item => (
                                <option key={item._id} value={item.name}>{item.name} - ${item.price}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <button type="submit" className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
                            Add Order
                        </button>
                    </div>
                </div>
            </form>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {orders.map(order => (
                    <li key={order._id} className="bg-gray-100 border p-4 rounded">
                        <p className="text-lg font-bold">{order.customerName}</p>
                        <p className="text-gray-700">{order.foodItem} - ${order.totalAmount}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Orders;
