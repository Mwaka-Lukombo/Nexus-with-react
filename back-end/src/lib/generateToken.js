
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();


export const generateToken = (userId,res)=>{
  const token = jwt.sign({userId},process.env.SECRET,{
    expiresIn:"7d"
  });

  res.cookie("jwt",token,{
    sameSite:"strict",
    httpOnly:true,
    secure:process.env.MONGO_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7
  })
}








