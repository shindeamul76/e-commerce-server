const Product  = require('../models/Product');

exports.createProduct = async (req, res) => {
    const newProduct = new Product(req.body);

    try {

        const savedProduct = await newProduct.save();

        res.status(200).json({
            success: true,
            savedProduct,
        })
        
    } catch (error) {

        res.status(500).json({
        success: false,
        message: error.message,
        })
        
    }
}


exports.updateProduct = async (req, res) => {
    try {

        const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new:true});

        res.status(200).json({
            success: true,
            updateProduct,
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        })
        
        
    }
}

exports.deleteProduct = async (req, res) => {

    try {

        await Product.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success: true,
            message: 'Product has been deleted....'
        })
        
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        })
        
    }
}

exports.getProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        res.status(200).json({
            success: true,
            product,
        })
        
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        })
        
    }
}

exports.getAllProduct = async (req, res) => {

    const qNew = req.query.new;
    const qCategory = req.query.category;

    try {

        let products;

        if(qNew) {
            products = await Product.find().sort({createdAt: -1}).limit(5)
        }else if(qCategory){
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                },
            });
        }else {
            products = await Product.find();
        }

        res.status(200).json({
            success: true,
            products,
        })
        
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        })
        
    }
}