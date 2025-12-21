const mongoose=require("mongoose")//that connect the databace in mongoDb

const connectDb=async()=>{
    await mongoose.connect(process.env.DATABASE_URL)//it awaite the connection string
    .then(()=>console.log('connectede sucssefuly.'))


}

module.exports=connectDb
