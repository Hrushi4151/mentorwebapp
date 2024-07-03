import Admin from "../../../models/Admin";
import connectDB from '../../../utils/mongoose'

import { NextResponse } from 'next/server';

export async function GET() {

    try {
        connectDB();
        
        const admins=await Admin.find();
        if(admins){
            return NextResponse.json({admins:admins, status: 200 }); 
        }else{
            return NextResponse.json({message:"No Admins Found", status: 201 }); 

        }

    } catch (error) {
        console.log(error)
        return NextResponse.json("database error occured", { status: 400 });
    }

}