var express = require('express');
var router = express.Router();
const multer = require("multer");
 var mongoose = require('mongoose');
const app = express();
const {Schema} = require("mongoose");
const { check, validationResult } = require('express-validator');
const e = require("express");

const uri = "mongodb+srv://admin:admin@cluster0.owchowq.mongodb.net/NTA2KDatabase?retryWrites=true&w=majority"



mongoose.connect(uri).catch(err => console.log('co loi xay ra'));

//dinh nghia schema (kieu du lieu) cua model products
const notes = mongoose.model('notes',new Schema({
  title:String,
    content:String
}));

/* GET home page. */
router.get('/', function(req, res, next) {
notes.find({},function (error, result){
    if (error) throw error;
    console.log(result.length)
     res.render('index',{title:'Express',data:result})
   // res.send(result);
})
});


router.post('/add'  ,async  function (req,res) {
//lay cac tham so
  const  title = req.body.title;
  const  content = req.body.content;
      const note = new notes({
          title: title,
          content: content
      })
      await note.save();
      res.redirect('/')

})

router.get('/getNotes',function (req,res){
    const noteList = mongoose.model('notes');
    noteList.find({},function (error, result){
        res.send(result)
    })

})

router.get('/delete',async  function (req,res){
    const id = req.query.id;
   notes.deleteOne({_id:id},function (error){
       if (error) throw error;
   })
    res.redirect('/')
})

router.get('/updateForm/', function (req, res) {

    const id = req.query.id;
    notes.findOne({_id: id}, function (error, result) {
        res.render('update', {title: 'Update', data: result})
    })

})
router.get('/insert',function (req, res){
    res.render('insert')
})

router.post('/update', async function (req, res) {
    const id =req.body.id;
    const  title = req.body.title;
    const  content = req.body.content;
    await notes.updateOne({_id: id}, {
        title:title,
        content:content
    }, null)

    res.redirect('/')
})

module.exports = router;
