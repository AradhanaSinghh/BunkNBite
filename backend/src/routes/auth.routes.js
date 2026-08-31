const express=require("express");
const authController=require("../controllers/auth.controller.js");

const router=express.Router();

//user auth api's 
router.post('/register',authController.registerUser);
router.post('/login',authController.loginUser);
router.get('/logout',authController.logoutUser);


//food Partner auth api's
router.post('/food-partner/register',authController.registerFoodPartner);
router.post('/food-partner/login',authController.loginFoodPartner);
router.get('/food-partner/logout',authController.logoutFoodPartner);

module.exports=router;