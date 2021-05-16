
const express = require('express');
const app = express();
const  mongoose  = require('mongoose');
const  bodyParser  = require('body-parser');
require('./user')

app.use(bodyParser.json())

const User = mongoose.model("user")


const mongoUri="mongodb+srv://connectdb:Rhino94@cluster0.gewim.mongodb.net/apptodo?retryWrites=true&w=majority"

mongoose.connect(mongoUri,
    { useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true, },
    ()=> console.log("connected to mongo"))



    app.post('/send', async (req,res)=>{
        const user = new User({
            name: req.body.name,
            position: req.body.position,
            email: req.body.email,
            phone: req.body.phone,
        })
        const savedPost = await user.save()
        .then(data=>{console.log(data)
            res.send(data); 
}).catch(err=>{
    console.log(err)
})
})
    app.post('/delete',async  (req,res)=>{
         await User.findByIdAndRemove(req.body.id)
       .then(data=>{console.log(data)
        res.send(data);  
}).catch(err=>{
    console.log(err)
})
})

app.get('/',async  (req,res)=>{
    await User.find({})
  .then(data=>{
   res.send(data);  
}).catch(err=>{
console.log(err)
})
})

app.post('/update',async  (req,res)=>{
    await User.findByIdAndUpdate(req.body.id,
        {
            name: req.body.name,  
            position: req.body.position,
            email: req.body.email,
            phone: req.body.phone,
        })
  .then(data=>{console.log(data)
   res.send(data);  
}).catch(err=>{
console.log(err)
})
})

  app.listen(3000,()=>{
      console.log("server running")
  })