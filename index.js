const express=require('express');
const Mongoose=require('mongoose');
const BookModel=require('./Models/Books')

const app=express();
const cors=require('cors');
const bodyParser=require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const url='mongodb+srv://knyhago:kenny@cluster0.2kzve.mongodb.net/?retryWrites=true&w=majority';

const port=8090;


app.get('/get',async(req,res)=>{
    BookModel.find().sort({"_id":1}).limit(2)
    .then((result)=>{
        res.status(200).send(result)
    })
})

app.post('/post',async(req,res)=>{
    
    const postdata=new BookModel({
        Name:req.body.name,
        Author:req.body.author,
        IsAvailable:true
    })
    
    try{
        const sac=await postdata.save()
        res.status(200).send(sac)

    }
    catch(err){
        if(err) throw err
    }
    
})

app.delete('/delete/:id',async (req,res)=>{
    var id=req.params.id;
    
    try{
        
       const del= await BookModel.findByIdAndDelete({_id:id})
       res.status(200).send('Deleted')
    }
    
    catch(err){
        if (err)
        {
            console.log(err)
            throw err
    }
}
})

app.patch('/patch/:id',async (req,res)=>{
    try{
        var id=req.params.id;
         
        // var data= await BookModel.findById(id);
        
        // data.Name=req.body.name

        // data.save()
        // .then((suc)=>{
        //     res.status(200).send(suc)
        // })

        BookModel.findByIdAndUpdate({_id:id},{$set:{Name:req.body.name}},{new:true})
        .then((suc)=>{
            res.status(200).send(suc)
        })


    }

    catch(err)
    {
        throw err
    }
})

Mongoose.connect(url,(err)=>{
    if (err) throw err;

    else{
        console.log('Connected to Momgoose')
        app.listen(port,(err,succ)=>{
            if(err){
                throw err
            }
            console.log(`connect to port : ${port}`)

    })

    }
    
   
})