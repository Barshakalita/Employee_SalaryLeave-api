import User from './models/User.js';
import bcrypt from 'bcryptjs';
import connectToDatabase from './db/db.js';
const userRegister = async ()=>{
    try{
        await connectToDatabase()
        const hashPassword=await bcrypt.hash("admin", 10);
        const newUser=new User({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashPassword,
            role: "admin"
        });
        await newUser.save(); 
    }catch(err){
        console.log(err);
    }
}
userRegister();