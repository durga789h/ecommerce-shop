import userModel from "../models/user-model.js";
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import jwt from 'jsonwebtoken'; // Change the import statement for JWT (import jwt/JWT)
import Order  from "../models/order-model.js";



const registercontroller = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        if (!name) {
            return res.send({ message: "name is required" });
        }
        if (!email) {
            return res.send({ message: "email is required" });
        }
        if (!password) {
            return res.send({ message: "password is required" });
        }
        if (!phone) {
            return res.send({ message: "phone is required" });
        }
        if (!address) {
            return res.send({ message: "address is required" });
        }
        const existinguser = await userModel.findOne({ email });
        if (existinguser) {
            return res.status(200).json({
                success: false,
                message: "Already Register please login"
            });
        }

        const hashedPassword = await hashPassword(password);
        const user = await new userModel({ name, email, phone, address, password: hashedPassword }).save();
        res.status(201).json({
            success: true,
            message: "registration successful",
            user
        });
        console.log(user);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Errro in Registeration",
        error,})
    }
};

 const logincontroller = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "email is not register"
            });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).json({
                success: false,
                message: "invalid password"

            });

        }
        const token =  jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(200).json({
            success: true,
            message: "login successful",
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              phone: user.phone,
              address: user.address,
              role: user.role,
            },
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in login",
            error
        });
    }
};
//test-controller
export const testcontroller=async(req,res)=>{
res.send("testing model");
console.log("test provided");
}

//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
    try {
      const { email, newPassword } = req.body;
      if (!email) {
        res.status(400).send({ message: "Emai is required" });
      }
      
      if (!newPassword) {
        res.status(400).send({ message: "New Password is required" });
      }
      //check
      const user = await userModel.findOne({ email});
      //validation
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Wrong Email Or Answer",
        });
      }
      const hashed = await hashPassword(newPassword);
      await userModel.findByIdAndUpdate(user._id, { password: hashed });
      res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  };
  
  
  
  //update profile
  export const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };
  
 export const getOrdersController = async (req, res) => {
    try {
        const orders = await Order.find({ buyer: req.user._id }).populate("products", "-photo").populate("buyer", "name");
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error while getting orders", error });
    }
};

// Get All Orders Controller
export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await Order.find({}).populate("products", "-photo").populate("buyer", "name").sort({ createdAt: "desc" });
        res.json({
          message:"order data",
          orders
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error while getting orders", error });
    }
};

// Order Status Controller
export const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error while updating order", error });
    }
};

//alluser
 const getuser = async (req, res) => {
    try {
      const users = await userModel.find({});
      
      res.status(200).json({
        users,
      });
     
      console.log(users); // Corrected console.log
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error fetching user data",
        error,
      });
    }
  
  }
  //single user
  const getUserById=async(req,res,next)=>{
    try {
        const id=req.params.id;
        
       const data= await userModel.findOne({_id:id},{password:0});
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}


  //user admin update logic
const updateUserById=async(req,res)=>{
try {
    const id=req.params.id;
    const updateUserData=req.body;
    const updatedData=await userModel.updateOne({_id:id},{
        $set:updateUserData,
    });
    console.log(updatedData);
    return res.status(200).json( updatedData);
   

} catch (error) {
    next(error);
}
}




//user delete logic
const deleteUserById=async(req,res)=>{
try {
    const id=req.params.id;
    await userModel.deleteOne({_id:id})
    return res.status(200).json({message:"user deleted successfully"})
    
} catch (error) {
    next(error)
    
}
}
  
  

export { registercontroller,logincontroller,getuser ,updateUserById,deleteUserById,getUserById};
