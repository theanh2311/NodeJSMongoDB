var express = require('express');
var router = express.Router();

 var mongoose = require('mongoose');
const {Schema} = require("mongoose");

const e = require("express");

const uri = "mongodb+srv://user:user@cluster0.flsq9.mongodb.net/Demo6?retryWrites=true&w=majority"

mongoose.connect(uri).catch(err => console.log('co loi xay ra'));

//dinh nghia schema (kieu du lieu) cua model products
const PRODUCT = mongoose.model('Products',new Schema({
  name:String,
  price:Number
}));


/* GET home page. */
router.get('/', function(req, res, next) {
PRODUCT.find({},function (error, result){
    if (error) throw error;
    console.log(result.length)
    res.render('index',{title:'Express',data:result})
})
});

router.post('/add' , async  function (req,res) {
//lay cac tham so
  const  name = req.body.name;
  const  price = req.body.price;
  const Products = new PRODUCT({
      name : name,
        price:price

  })
    await Products.save();
  res.redirect('/')

})

router.get('/getUser',function (req,res){
    const prdList = mongoose.model('Products',);
    prdList.find({},function (error, result){
        res.send(result)
    })

})

router.get('/delete',async  function (req,res){
    const id = req.query.id;
   PRODUCT.deleteOne({_id:id},function (error){
       if (error) throw error;
   })
    res.redirect('/')
})
router.get('/updateForm/', function (req, res) {

    const id = req.query.id;
    PRODUCT.findOne({_id: id}, function (error, result) {
        res.render('update', {title: 'Update', data: result})
    })

})
router.post('/update', async function (req, res) {
    const id =req.body.id;
    var name  = req.body.name;
    var  price = req.body.price;


    await PRODUCT.updateOne({_id: id}, {
        name: name,
        price: price
    }, null)

    res.redirect('/')
})
module.exports = router;
