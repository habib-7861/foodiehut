import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


//login user
const loginUser = async (req,res) =>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User Doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Incorrect Password"})
        }

        const token = createToken(user._id);
        res.json({success:true,message:"User logged in successfully",token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Failed to login user"})
    }
}

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET);
}



const registerUser = async (req,res) => {
    const {name,password,email} = req.body;
    try{
        //checking if user is already registered.
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"user already exists"})
        }

        //validating email format & strong password.
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong password"})
        }

        // hashing user password.
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name:name,
            email:email,
            password: hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,message:"User registered successfully",token})

    } catch(error){
        console.log(error);
        res.json({success:false,message:"Failed to register user"})
    }
};


// //Gpt
// // Function to update user's payment status to true
// const updateUser = async (req, res) => {
//     const { userId } = req.body; // Expecting the userId in the request body

//     try {
//         // Find the user by userId
//         const user = await userModel.findById(userId);

//         if (!user) {
//             return res.json({ success: false, message: "User not found" });
//         }

//         // Update the user's payment status to true
//         user.payment = true; // Assuming 'payment' is a field in the user model

//         // Save the updated user
//         await user.save();

//         res.json({ success: true, message: "User payment status updated successfully" });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Failed to update user" });
//     }
// };

export { loginUser, registerUser };