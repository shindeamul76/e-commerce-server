const Cart  = require('../models/Cart');

exports.createCart = async (req, res) => {
    const newCart = new Cart(req.body);

    try {

        const savedCart = await newCart.save();

        res.status(200).json({
            success: true,
            savedCart,
        })
        
    } catch (error) {

        res.status(500).json({
        success: false,
        message: error.message,
        })
        
    }
}


exports.updateCart = async (req, res) => {
    try {

        const updateCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new:true});

        res.status(200).json({
            success: true,
            updateCart,
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        })
        
        
    }
}

exports.deleteCart = async (req, res) => {

    try {

        await Cart.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success: true,
            message: 'Cart has been deleted....'
        })
        
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        })
        
    }
}

exports.getUserCart = async (req, res) => {

    try {

        const cart = await Cart.findOne({userId: req.params.userId});

        res.status(200).json({
            success: true,
            cart,
        })
        
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        })
        
    }
}

exports.getAllCarts = async (req, res) => {
    try {

        const carts = await Cart.find();

        res.status(200).json({
            success: true,
            carts,
        })
        
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        })
        
    }
}