import Mentee from "../../../models/Mentee";
import connectDB from '../../../utils/mongoose'

import { NextResponse } from 'next/server';

export async function POST(req,res) {

    try {
        connectDB();
        let body=await req.json()
        console.log(body)
        if(body.enrollment){
            console.log("body1")
            console.log(body.enrollment)
            const mentees = await Mentee.findOne({enrollment:body.enrollment});
            
            if(mentees!=null)
            {
                return NextResponse.json({ mentees , status: 200 });
            }else{
                return NextResponse.json({ result:"No Record Found" , status: 201 });
            }
        }else if(body.id){
            console.log("body2")

            const mentees = await Mentee.findOne({_id:body.id});
            console.log(mentees)
            if(mentees!=null)
            {
                return NextResponse.json({ mentees , status: 200 });
            }else{
                return NextResponse.json({ result:"No Record Found" , status: 201 });
            }
        }else{
            return NextResponse.json({ result:"Enter Valid Enrollment No." , status: 300 });
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json("database error occured", { status: 400 });
    }

}