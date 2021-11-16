import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
//import { Router } from "express";
const router = express.Router();

//Models
import { BusinessModel } from "../../../SchemaModels/business";

//Validation for fields we are entering
//import { ValidateSignup , ValidateSignin} from "../../../Validation/auth";



/*
Route         /signup
Descrip       Signup with email and password
Params        None
Access        Public
Method        POST
*/

router.post("/signup", async(req,res) => {
  try {
//await ValidateSignup(req.body.credentials);

await BusinessModel.findByEmailAndPhone(req.body.credentials);
  //DB
   const newBusiness = await BusinessModel.create(req.body.credentials);

   //JWT Auth Token
   const token = newBusiness.generateJwtToken();

   return res.status(200).json({token});

  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});


/*
Route         /signin
Descrip       Signin with email and password
Params        None
Access        Public
Method        POST
*/

//  router.post("/signin", async(req,res) => {
//    try {
//  //await ValidateSignin(req.body.credentials);

//     const user = await UserModel.findByEmailAndPassword(req.body.credentials);

//     //JWT Auth Token
//     const token = user.generateJwtToken();

//      return res.json({ userExists: user });
//     //return res.status(200).json({token, status: "Success"});

//    } catch (error) {
//      return res.status(500).json({error: error.message});
//    }
//  });


// /*
// Route         /google
// Descrip       Google Signin
// Params        None
// Access        Public
// Method        GET
// */

router.get("/google", passport.authenticate("google",{
 scope: [
   "https://www.googleapis.com/auth/userinfo.profile",
   "https://www.googleapis.com/auth/userinfo.email"
 ],
 })
 );

// /*
// Route         /google/callback
// Descrip       Google Signin callback
// Params        None
// Access        Public
// Method        GET
// */

 router.get("/google/callback", passport.authenticate("google",{failureRedirect: "/"}),
 (req,res) => {
   return res.json({token: req.session.passport.user.token});
 }
 );

export default router;