import Mentee from "../../../models/Mentee";
import connectDB from '../../../utils/mongoose'

import { NextResponse } from 'next/server';

export async function POST(req,res) {
    try {
        const { menteesarr } = await req.json();
        console.log(menteesarr)
        connectDB();
        menteesarr.map(async(row)=>{
            const doc = { 
                enrollment: row[0],
                roll: row[1],
                password: row[2],
                address: row[3],
                mobile: row[4],
                department: row[5],
                year: row[6],
                name: row[7],
                fathername: row[8],
                fatherocc: row[9],
                mothername: row[10],
                motherocc: row[11],
                age: row[12],
                pincode: row[13],
                email: row[14],
                batch: row[15],
             };
            const result = await Mentee.create(doc);
            console.log(doc)
        })
        

        return NextResponse.json({ result:"Succesfull inserted" , status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json("database error occured", { status: 400 });
    }

}