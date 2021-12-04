const router = require('express').Router();
const User = require('../models/User');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: cryptoJS.AES.encrypt(req.body.password, process.env.secretKey).toString()
    })
    try{
        const user = await newUser.save()
        res.status(201).json(user)
    }catch(err){
        res.status(500).json(err)
    }
    
})

router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne({ email:req.body.email});
        !user && res.status(404).json("wrong username or password");

        const bytes = cryptoJS.AES.decrypt(user.password, process.env.secretKey)
        const originalPassword = bytes.toString(cryptoJS.enc.Utf8)

        originalPassword !== req.body.password && res.status(404).json("wrong username or password");

        const accessToken = jwt.sign( 
            { id:user._id, isAdmin:user.isAdmin}, 
            process.env.secretKey, 
            { expiresIn : "5d" });
        
        const { password, ...info } = user._doc;

        res.status(200).json({...info, accessToken})

    }catch (err) {
        res.status(500).json(err)
    }
} )

module.exports = router