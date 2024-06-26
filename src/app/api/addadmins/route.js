import Admin from "../../../models/Admin";
import connectDB from '../../../utils/mongoose'

import { NextResponse } from 'next/server';

export async function POST(req,res) {
    try {
        const { menteesarr } = await req.json();
        console.log(menteesarr)
        connectDB();
        if(Array.isArray(menteesarr)){menteesarr.map(async(row)=>{
            const doc = { 
                enrollment: row[0],
                password: row[2],
                phone: row[3],
                name: row[1],
                email: row[4]
             };
             
             console.log(doc)
            const result = await Admin.create(doc);
        })}else{
            const doc = { 
                enrollment: menteesarr.enrollment,
                password: menteesarr.password,
                phone: menteesarr.phone,
                name: menteesarr.name,
                email: menteesarr.email
             };
             
            const result = await Admin.create(doc);
        }
        

        return NextResponse.json({ result:"Succesfull inserted" , status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json("database error occured", { status: 400 });
    }

}