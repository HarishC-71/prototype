const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/login_model');

const sign=async(req,res)=>{
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({message:"user already register"})
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser=await User.create({ name, email, password: passwordHash })
        res.json(newUser)
    } catch (error) {
        res.json(error.message)
    }
}

const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({
            token,
            user: {
                id: user.id, name: user.name, email: user.email
            }
        }
        );
    } catch (error) {
        res.json({ message: 'Server error' });
    }
}

const getUserProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.json({ message: 'Server error' });
  }
};


module.exports = { sign, login, getUserProfile };