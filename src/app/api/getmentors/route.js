import Mentor from "../../../models/Mentor";
import connectDB from '../../../utils/mongoose'

import { NextResponse } from 'next/server';

export async function GET() {

    try {
        connectDB();
        
        const mentors=await Mentor.find();
        console.log(mentors)
        if(mentors){
            return NextResponse.json({mentors:mentors, status: 200 }); 
        }else{
            return NextResponse.json({message:"No Mentors Found", status: 201 }); 

        }

    } catch (error) {
        console.log(error)
        return NextResponse.json("database error occured", { status: 400 });
    }

}