var express = require('express');
var router = express.Router();
const multer = require("multer");
 var mongoose = require('mongoose');
const app = express();
const {Schema} = require("mongoose");
const { check, validationResult } = require('express-validator');
const e = require("express");

const uri = "mongodb+srv://user:user@cluster0.flsq9.mongodb.net/Demo6?retryWrites=true&w=majority"
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage })
mongoose.connect(uri).catch(err => console.log('co loi xay ra'));

//dinh nghia schema (kieu du lieu) cua model products
const IMAGE = mongoose.model('wallpapers',new Schema({
  title:String,
    content:String,
  post:String,
   link:String
}));
app.post("/uploadphoto",upload.single('myImage'),(req,res)=>{
    var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');
    var final_img = {
        contentType:req.file.mimetype,
        image:new Buffer(encode_img,'base64')
    };
    IMAGE.create(final_img,function(err,result){
        if(err){
            res.end("loi")
        }else{
            console.log(result.img.Buffer);
            console.log("Saved To database");
            res.contentType(final_img.contentType);
            res.send(final_img.image);
        }
    })
})

/* GET home page. */
router.get('/', function(req, res, next) {
IMAGE.find({},function (error, result){
    if (error) throw error;
    console.log(result.length)
     res.render('index',{title:'Express',data:result})
   // res.send(result);
})
});
router.get('/view', function(req, res, next) {
    IMAGE.find({},function (error, result){
        if (error) throw error;
        console.log(result.length)
        res.render('view',{title:'Express',data:result})
        // res.send(result);
    })
});


router.post('/add'  ,async  function (req,res) {
//lay cac tham so
  const  title = req.body.title;
  const  content = req.body.content;
  const post = req.body.post;
  const link = req.body.link

      const image = new IMAGE({
          title: title,
          content: content,
          post: post,
          link:link
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
/*router.get('/update', async function (req, res) {
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
})*/
module.exports = router;
