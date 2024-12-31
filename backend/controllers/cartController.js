import userModel from '../models/userModel.js'

//add items to user cart

// const addToCart = async (req,res) => {
//     try {
//         let userData = await userModel.findOne({_id:req.body.userId});
//         let cartData = await userData.cartData;
//         if(!cartData[req.body.itemId])
//         {
//             cartData[req.body.itemId] = 1;
//         }
//         else
//         {
//             cartData[req.body.itemId] += 1;
//         }
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData});
//         res.json({success:true, message: "Item added to cart successfully"})
//     } catch (error) {
//         console.log( error);
//         res.json({success:false, message: "Failed to add item to cart"})
//     }
// }


// Gpt wala code.
const addToCart = async (req, res) => {
    try {
        // Retrieve the user by ID
        const userData = await userModel.findById(req.body.userId);

        // Check if user exists
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        // Ensure cartData is initialized as an object
        let cartData = userData.cartData || {};

        // Update the cartData with the item
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        // Update the user's cartData in the database
        await userModel.findByIdAndUpdate(req.body.userId, { cartData }, { new: true });

        // Respond with success
        res.json({ success: true, message: "Item added to cart successfully" });
    } catch (error) {
        console.error("Error adding item to cart:", error.message);
        res.json({ success: false, message: "Failed to add item to cart" });
    }
};



//remove items from user cart
const removeFromCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0)
        {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true, message: "Item removed from cart successfully"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Failed to remove item from cart"})
    }
}


// fetch user cart data
const getCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Failed to fetch cart data"})
    }
}

export {addToCart, removeFromCart, getCart}
