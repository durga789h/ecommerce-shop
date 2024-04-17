import express from 'express';
const router=express.Router();
import {registercontroller,logincontroller,testcontroller,forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController, getuser, deleteUserById, updateUserById, getUserById,} from '../controllers/authcontroller.js'
import { isAdmin, requiredSignIn } from '../middlewares/auth-middleware.js'

router.post("/register",registercontroller)
router.post("/login",logincontroller);
router.get("/test",requiredSignIn,isAdmin,testcontroller);
router.get("/user/data",requiredSignIn,isAdmin,getuser); //for userdata.
router.get("/user/data/:id",requiredSignIn,isAdmin,getUserById); //for single user data.
router.delete("/user/data/delete/:id",requiredSignIn,isAdmin,deleteUserById)

router.put("/user/data/update/:id",requiredSignIn,isAdmin,updateUserById)
router.get("/user-auth",requiredSignIn,(req,res)=>{
    res.status(200).send({
        ok:true
    })
})

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//protected Admin route auth
router.get("/admin-auth", requiredSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });
  
  //update profile
  router.put("/profile", requiredSignIn, updateProfileController);
  
  //orders
  router.get("/orders", requiredSignIn, getOrdersController);
  
  //all orders
  router.get("/all-orders", requiredSignIn, isAdmin, getAllOrdersController);
  
  // order status update
  router.put(
    "/order-status/:orderId",
    requiredSignIn,
    isAdmin,
    orderStatusController
  );


export default router;