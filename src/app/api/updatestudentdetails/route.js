import Mentee from "../../../models/Mentee";
import connectDB from '../../../utils/mongoose'

import { NextResponse } from 'next/server';

export async function POST(req,res) {
    try {
        const { data } = await req.json();
        console.log(data)
        const {_id,createdAt,updatedAt,__v,...finaldata}=data;
        console.log(finaldata)
        connectDB();
        let updateddata=await Mentee.findByIdAndUpdate({ _id: _id },finaldata)
        console.log(updateddata)
        return NextResponse.json({ result:"Succesfull Updated" ,  status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ result:"Failed to Allocate" ,  status: 400 });
    }

}