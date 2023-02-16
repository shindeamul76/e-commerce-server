const express = require('express');
const ConnectDB = require('./database/Connect');
const app = express();
require('dotenv').config();
const PORT = 5000;
const Register = require('./routes/User');
const Product = require('./routes/Product');
const Cart = require('./routes/Cart');
const Order = require('./routes/Order');
const stripeRoute = require("./routes/Stripe");
const cors = require('cors')




app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())

app.use('/api/v1/auth', Register);
app.use('/api/v1/product', Product);
app.use('/api/v1/cart', Cart);
app.use('/api/v1/order', Order);
app.use('/api/v1/checkout', stripeRoute);





const start = async () => {
    try {
        await ConnectDB(process.env.MONGO_URI)
        app.listen(PORT, ()=> console.log(`Connected to server ${PORT}....`))    
    } catch (error) {
        console.log(error);
    }
}
start();
