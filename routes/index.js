var express = require('express');
var router = express.Router();

 var mongoose = require('mongoose');
const {Schema} = require("mongoose");

const e = require("express");

const uri = "mongodb+srv://user:user@cluster0.flsq9.mongodb.net/Demo6?retryWrites=true&w=majority"

mongoose.connect(uri).catch(err => console.log('co loi xay ra'));

//dinh nghia schema (kieu du lieu) cua model products
const IMAGE = mongoose.model('wallpapers',new Schema({
  link:String,
    description:String,
  date:Date
}));


/* GET home page. */
router.get('/', function(req, res, next) {
IMAGE.find({},function (error, result){
    if (error) throw error;
    console.log(result.length)
     res.render('index',{title:'Express',data:result})
   // res.send(result);
})
});

router.post('/add' , async  function (req,res) {
//lay cac tham so
  const  link = req.body.link;
  const  description = req.body.description;
  const date = req.body.date;
  const image = new IMAGE({
      link : link,
        description:description,
      date:date

  })
    await image.save();
  res.redirect('/')

})

router.get('/getImage',function (req,res){
    const imgList = mongoose.model('wallpapers');
    imgList.find({},function (error, result){
        res.send(result)
    })

})

router.get('/delete',async  function (req,res){
    const id = req.query.id;
   IMAGE.deleteOne({_id:id},function (error){
       if (error) throw error;
   })
    res.redirect('/')
})
router.get('/updateForm/', function (req, res) {

    const id = req.query.id;
    IMAGE.findOne({_id: id}, function (error, result) {
        res.render('update', {title: 'Update', data: result})
    })

})
router.get('/insert',function (req, res){
    res.render('insert')
})
router.post('/update', async function (req, res) {
    const id =req.body.id;
    var link     = req.body.link;
    var  description = req.body.description;
    var date = req.body.date;



    await IMAGE.updateOne({_id: id}, {
        link   : link,
        description: description,
        date:date
    }, null)

    res.redirect('/')
})
module.exports = router;
