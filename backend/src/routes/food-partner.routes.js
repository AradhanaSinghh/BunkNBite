const express=require('express');
const router=express.Router();
const authMiddleware=require("../middlewares/auth.middleware.js");
const FoodPartnerController=require("../controllers/food-partner.controller.js");

router.get("/:id",authMiddleware.authUserMiddleware,FoodPartnerController.getFoodPartnerById)
module.exports=router;