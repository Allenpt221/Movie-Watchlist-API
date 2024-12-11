import userAuth from '../model/auth.model.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../lib/utils.js';

export const signup = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        if(!username || !email || !password){
            return res.status(400).json({success: false, message: 'All fields are required'});
        }

        if(password.length < 6){
            return res.status(400).json({success: false, message: 'password must be atleast 6 characters'});
        }
        const ExistUserEmail = await userAuth.findOne({email});
        const ExistUsername = await userAuth.findOne({username});
        
        if(ExistUserEmail) return res.status(400).json({success: false, message: 'Email already exist'});
        if(ExistUsername) return res.status(400).json({success: false, message: 'Username already exist'});


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userAuth({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        generateToken(newUser._id, res);
        

        return res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
        });
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const checkUser = await userAuth.findOne( {email} );

        if(!checkUser) {
            return res.status(400).json({success: false, message: 'Invalid credentials'});
        }
        const isCorrectPassword = await bcrypt.compare(password, checkUser.password);

        if(!isCorrectPassword) {
            return res.status(400).json({success: false, message: 'Invalid credentials'});
        }
        
        generateToken(checkUser._id, res);

        return res.status(200).json({
            _id: checkUser._id,
            username: checkUser.username,
            email: checkUser.email
        });
        
    } catch (error) {
        console.log("Error in login controller", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const logout = (req, res) => {
    try {
      res.cookie("jwt", "", { maxAge: 0 });
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.log("Error in logout controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };