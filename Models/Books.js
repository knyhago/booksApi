const Mongoose=require('mongoose');

const BookSchema=new Mongoose.Schema({
    Name:String,
    Author:String,
    Date:Date,
    IsAvailable:Boolean
})

module.exports=Mongoose.model("BookModel",BookSchema);