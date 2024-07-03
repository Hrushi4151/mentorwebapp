import Mentor from "../../../models/Mentor";
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
                password: row[2],
                phone: row[3],
                department: row[4],
                name: row[1],
                email: row[5]
             };
             
             console.log(doc)
             const mentor = Mentor.find({enrollment:doc.enrollment});
             if(mentor!=null){
                console.log("sddgdgf")
                const result = await Mentor.create(doc);
             }

            
        })
        return NextResponse.json({ result:"Succesfull inserted" , status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json("database error occured", { status: 400 });
    }

}
