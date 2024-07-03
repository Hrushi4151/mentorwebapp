import Admin from "../../../models/Admin";
import connectDB from '../../../utils/mongoose'

import { NextResponse } from 'next/server';

export async function POST(req,res) {
    try {
        const { newadmin } = await req.json();
        console.log(newadmin)
        connectDB();
       
             
            const result = await Admin.create(newadmin);
        
        

        return NextResponse.json({ result:"Succesfull inserted" , status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json("database error occured", { status: 400 });
    }

}