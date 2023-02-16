
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

exports.Register = async (req, res) => {

    try {

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
                req.body.password,
                process.env.PASS_SEC
                ).toString(),
        });

     

        const savedUser = await newUser.save();

        res.status(200).json({
            success: true,
            savedUser,
        })
        
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        })
        
    }
}

exports.Login = async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
           return res.status(400).json({
                success: false,
                message:"Wrong credentials!"
            })
        }

        const accessToken = jwt.sign({
            id:user._id, 
            isAdmin:user.isAdmin,

        },
        process.env.JWT_SEC,
        {expiresIn:'3d'},
        )

        const hashPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );

        let originalPassword = hashPassword.toString(CryptoJS.enc.Utf8);

        originalPassword = req.body.password;

        const {password, ...others} = user._doc;


        if (!password) {
          return  res.status(400).json({
                success: false,
                message:"Wrong credentials!"
            })
        }

        res.status(200).json({
            success: true,
            ...others,
            accessToken,
        })
        
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        })
        
    }
}


exports.updateUser = async (req, res) => {

    if(req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
            ).toString()
    }

    try {

        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new:true});

        res.status(200).json({
            success: true,
            updateUser,
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        })
        
        
    }
}

exports.deleteUser = async (req, res) => {

    try {

        await User.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success: true,
            message: 'User has been deleted....'
        })
        
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        })
        
    }
}

exports.getUser = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        const {password, ...others} = user._doc

        res.status(200).json({
            success: true,
            others,
        })
        
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        })
        
    }
}

exports.getAllUsers = async (req, res) => {

    const query = req.query.new;

    try {
        const users = query
         ? await User.find().sort({_id:-1}).limit(1)
         : await User.find();

        res.status(200).json({
            success: true,
            users,
        })
        
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        })
        
    }
}

exports.getUserStats = async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {

        const data = await User.aggregate([
            {$match: {createdAt: { $gte: lastYear}}},
            {
                $project: {
                    month: {$month : "$createdAt"},
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                }
            }

        ])

        res.status(200).json({
            success: true,
            data,
        })
        
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        })
        
    }
}