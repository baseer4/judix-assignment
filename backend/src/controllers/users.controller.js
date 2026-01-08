import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";


export const signup =async (req,res) =>{
    const{fullName,email,password} =req.body;
    try {
        if( !fullName || !email || !password){
            return res.status(400).json({message:"All fields are requierd"});
        }
        if(password.length<8){
            return res.status(400).json({message:"passsword must be atleast 8 characters"});
        }

        const user = await User.findOne({email});
        if(user) return res.status(400).json({message:"Email already in use"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword =await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        });

        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
            });
        }
        else{
            req.status(400).json({message :"Invalid user data"});
        }
    } catch (error) {
       console.log("Error while signing up",error.message);
       res.status(500).json({message:"internal server error"})
        
    }
}

export const checkAuth = async(req,res) =>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error while checking auth",error.message);
        res.status(500).json({message:"internal server error"});
    }
}

export const logout = async(req,res) =>{
    try {
        res.cookie("jwt","", {maxAge:0})
        res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

export const login = async(req,res) =>{
    const {email,password} = req.body;

    try {
        if( !email || !password){
            return res.status(400).json({message:"All fields are requierd"});
        }
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }

        const isPassCorrect = await bcrypt.compare(password,user.password);

        if(!isPassCorrect){
            return res.status(400).json({message:"Invalid credentials"});
        }

        generateToken(user._id,res);

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
        })
    } catch (error) {
        console.log("Error while logging in",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

export const updateProfile = async(req,res) =>{
    const {fullName} = req.body;
    const userId = req.user._id;

    try {
        if(!fullName){
            return res.status(400).json({message:"Full name is required"});
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        user.fullName = fullName;
        await user.save();

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
        });
    } catch (error) {
        console.log("Error while updating profile",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

export const updatePassword = async(req,res) =>{
    const {currentPassword, newPassword} = req.body;
    const userId = req.user._id;

    try {
        if(!currentPassword || !newPassword){
            return res.status(400).json({message:"Current password and new password are required"});
        }

        if(newPassword.length < 8){
            return res.status(400).json({message:"Password must be at least 8 characters"});
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        const isPassCorrect = await bcrypt.compare(currentPassword, user.password);
        if(!isPassCorrect){
            return res.status(400).json({message:"Current password is incorrect"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({message:"Password updated successfully"});
    } catch (error) {
        console.log("Error while updating password",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}
