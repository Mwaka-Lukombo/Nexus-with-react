
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();


export const generateToken = (userId,res)=>{
  try {
        const token = jwt.sign({userId},process.env.SECRET,{
        expiresIn:"7d"
      });

      res.cookie("jwt",token,{
        sameSite:"strict",
        httpOnly:true,
        secure:process.env.MONGO_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7
      })

      return token;
  } catch (error) {
      console.log("Error ao gerar Token",error.message);
      res.status(500).json({message:"Error in token generate!"})
  }
}








