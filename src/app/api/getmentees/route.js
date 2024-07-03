import Mentee from "../../../models/Mentee";
import connectDB from '../../../utils/mongoose'

import { NextResponse } from 'next/server';

export async function POST(req,res) {

    try {
        connectDB();
        let {data}=await req.json()
        console.log(data.profname)
        if(data.profname!=null && data.batch!=null){
            const mentees = await Mentee.find({
                batch:data.batch,
                $or: [
                  {"mentors.fy": data.profname},
                  {"mentors.sy": data.profname},
                  {"mentors.ty": data.profname}
                ]
              });
            console.log(mentees)
            if(mentees!=null)
            {
                return NextResponse.json({ mentees , status: 200 });
            }else{
                return NextResponse.json({ result:"No Record Found" , status: 201 });
            }
        }else{
            const mentees = await Mentee.find({
                $or: [
                  {"mentors.fy": data.profname},
                  {"mentors.sy": data.profname},
                  {"mentors.ty": data.profname}
                ]
              });
            console.log(mentees)
            if(mentees!=null)
            {
                return NextResponse.json({ mentees , status: 200 });
            }else{
                return NextResponse.json({ result:"No Record Found" , status: 201 });
            }
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json("database error occured", { status: 400 });
    }

}