const express = require("express");
const res = require('express/lib/response');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const OrderMdl = require('../../models/orders');


router.route("/user/orders").post((req,res) => {
    console.log(req.body)
    const newOrder = new OrderMdl({
        user_id: req.body.user_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address,
        city: req.body.city,
        phone: req.body.phone,
        email: req.body.email,
        description: req.body.description,
        item: req.body.item  
    });

    newOrder.save().then(res.sendStatus(200));
})


router.route("/orders/user/:userId").get(async (req, res) => {
  try {
    const orders = await OrderMdl.find({ user_id: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).send(err);
  }
});


router.route("/admin/getorders").get((req,res)=>{
    OrderMdl.find({}).then((OrderMdl)=>{
        res.json(OrderMdl)
    }).catch((err)=>{
        res.json(err)
    })
});


// Delete an order
router.delete("/orders/:id", async (req, res) => {
  try {
    const order = await OrderMdl.findByIdAndDelete(req.params.id);
    res.send(order);
  } catch (err) {
    res.status(500).send(err);
  }
});



// Edit an order
router.put("/admin/orders/:id", async (req, res) => {
    try {
      const order = await OrderMdl.findByIdAndUpdate(req.params.id, req.body);
      res.send(order);
    } catch (err) {
      res.status(500).send(err);
    }
  });

// // Delete an order
// router.delete("/orders/:id", async (req, res) => {
//     try {
//       const order = await OrderMdl.findByIdAndDelete(req.params.id);
//       res.send(order);
//     } catch (err) {
//       res.status(500).send(err);
//     }
//   });



module.exports = router;