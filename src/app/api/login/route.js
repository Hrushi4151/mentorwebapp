import Mentor from "@/models/Mentor";
import Mentee from "../../../models/Mentee";
import connectDB from '../../../utils/mongoose'
import { NextResponse } from "next/server"
import Admin from "@/models/Admin";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

export async function POST(req, res) {
  try {
    const body = await req.json();
    await connectDB();
    const {enrollment,password,userrole}=body.data;
    console.log(body)
    let user
    if(enrollment && password && userrole){
      if(userrole=="mentee"){
        user = await Mentee.findOne({enrollment:enrollment});
      }
      else if(userrole=="mentor"){
        user = await Mentor.findOne({ enrollment: enrollment });
      }else if(userrole=="admin"){
        user = await Admin.findOne({ enrollment: enrollment });
      }
      console.log(user)
    if (user) {
      // const bytes = CryptoJS.AES.decrypt(user.password, "secretkey123");
      // const decryptpass = bytes.toString(CryptoJS.enc.Utf8);
      if (enrollment===user.enrollment && password === user.password) {
        var token = jwt.sign({ enrollment:user.enrollment,userrole:userrole,name:user.name }, 'jwttoken',{expiresIn: '2days'});
        console.log("token")
        return NextResponse.json({ status: 200,token , message: "success"});
      } else {
        return NextResponse.json(
          { status: 201 , message: "Invalid Credentials" }
        );
      }
    } else {
      return NextResponse.json({ status: 400,message: "User not found" });
    }
  }else{
    return NextResponse.json({ status: 203,message: "Enter all Details" });

  }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 301 , error: "failed to login" });
  }
}
