const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = 'mongodb+srv://chinufreefire1233:888888@cluster0.rarauvt.mongodb.net/food?retryWrites=true&w=majority'; // Replace with your MongoDB Atlas URI
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
    customerName: String,
    foodItem: String,
    totalAmount: Number
});
const corsOptions = {
    origin: 'https://your-react-app.vercel.app', // Replace with your actual client URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent
    optionsSuccessStatus: 204 // Some legacy browsers (IE11, various SmartTVs) choke on 204
  };

const Order = mongoose.model('Order', orderSchema);

// Food Item Schema
const foodItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

const foodItems = [
    { _id: 1, name: 'Cake', price: 10 },
    { _id: 2, name: 'Pizza', price: 12 },
    { _id: 3, name: 'Burger', price: 8 },
    { _id: 4, name: 'Pasta', price: 15 },
    { _id: 5, name: 'Ice Cream', price: 5 }
];

// Endpoint to get all food items
app.get('/food-items', (req, res) => {
    res.json(foodItems);
});
app.get('/', (req, res) => {
    res.json("hiii");
});

// Signup Endpoint
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// Login Endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// POST Order (no authentication required)
app.post('/orders', async (req, res) => {
    const { customerName, foodItem, totalAmount } = req.body;

    if (!customerName || !foodItem || !totalAmount) {
        return res.status(400).json({ error: 'Customer name, food item, and total amount are required' });
    }

    try {
        const newOrder = new Order({ customerName, foodItem, totalAmount });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// GET all orders (no authentication required)
app.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
