import { BusinessModel } from "../../SchemaModels/business";

import express from "express"
import passport from "passport";


const Router=express.Router()

// 
Router.get("/", passport.authenticate("business"), async (req, res) => {
  try {
    console.log(req);
   console.log(req.session.passport.user._doc);
   const { email, firstName, contactNumber, lastName,_id,description,address,website,twitter,instagram,facebook,name} =
      req.session.passport.user._doc;
     
    return res.json({ business: {  email, firstName, contactNumber, lastName,_id,description,address,website,twitter,instagram,facebook,name} });
  } catch (error) {     return res.status(500).json({ error: error.message });
  }
});

Router.put("/update/:businessId", async (req, res) => {
  try {
    console.log(req.params);
    const { businessId } = req.params;
    const  businessData  = req.body.businessUpdatedata;
    console.log(businessId);
    console.log("Hurray");
    console.log(businessData);
    const updateBusinessData = await BusinessModel.findByIdAndUpdate(
      businessId,
      {
        $set: businessData,
      },
      { new: true }
    );

    return res.json({ business: updateBusinessData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


export default Router;