import Mentee from "../../../models/Mentee";
import connectDB from '../../../utils/mongoose'

import { NextResponse } from 'next/server';

export async function GET(req,res) {

    try {
        connectDB();
        
        
            const mentees = await Mentee.find();
            console.log(mentees)
            if(mentees!=null)
            {
                return NextResponse.json({ mentees , status: 200 });
            }else{
                return NextResponse.json({ result:"No Record Found" , status: 201 });
            }

    } catch (error) {
        console.log(error)
        return NextResponse.json("database error occured", { status: 400 });
    }

}