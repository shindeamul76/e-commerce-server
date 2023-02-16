const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    const newOrder = new Order(req.body);

    try {

        const savedOrder = await newOrder.save();

        res.status(200).json({
            success: true,
            savedOrder,
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        })

    }
}


exports.updateOrder = async (req, res) => {
    try {

        const updateOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });

        res.status(200).json({
            success: true,
            updateOrder,
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        })


    }
}

exports.deleteOrder = async (req, res) => {

    try {

        await Order.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success: true,
            message: 'Order has been deleted....'
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        })

    }
}

exports.getUserOrder = async (req, res) => {

    try {

        const orders = await Order.find({ userId: req.params.userId });

        res.status(200).json({
            success: true,
            orders,
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        })

    }
}

exports.getAllOrders = async (req, res) => {
    try {

        const orders = await Order.find();

        res.status(200).json({
            success: true,
            orders,
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        })

    }
}

// GET MONTHLY INCOME

exports.getMonthlyIncome = async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {

        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },

            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },

        ]);

        res.status(200).json({
            success: true,
            income,
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        })

    }
}