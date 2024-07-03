// import Mentee from "../../../models/Mentee";
// import connectDB from '../../../utils/mongoose'

// import { NextResponse } from 'next/server';

// export async function POST(req,res) {
//     try {
//         const { mentorarr } = await req.json();
//         console.log(mentorarr)
//         connectDB();
//         mentorarr.map(async(row)=>{
//             let mentee=await Mentee.find({ enrollment: row[0] })
//             let id=mentee[0].id
//             console.log(id)
//             console.log(mentee[0].mentors)
//             let year=row[2]
//             if(year.toLowerCase()=="fy"){
//                 mentee[0].mentors.fy=row[3]
//             }else if(year.toLowerCase()=="sy"){
//                 mentee[0].mentors.sy=row[3]
//             }else if(year.toLowerCase()=="ty"){
//                 mentee[0].mentors.ty=row[3]
//             } 
//             const updatedmentors=mentee[0].mentors
//             // console.log(updatedmentors)
//             let updatementor=await Mentee.findByIdAndUpdate({ _id: id },{mentors:updatedmentors})
//             console.log(updatementor)
//         })
        

//         return NextResponse.json({ result:"Succesfull inserted" ,  status: 200 });
//     } catch (error) {
//         console.log(error)
//         return NextResponse.json({ result:"Failed to Allocate" ,  status: 400 });
//     }

// }


import Mentee from "../../../models/Mentee";
import connectDB from '../../../utils/mongoose'
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    try {
        const { mentorarr } = await req.json();
        console.log(mentorarr);
        await connectDB(); // Ensure the database connection is established

        // Use a for...of loop to handle async operations sequentially
        for (const row of mentorarr) {
            let mentee = await Mentee.findOne({ enrollment: row[0] }); // Use findOne to get a single document
            if (!mentee) {
                console.error(`Mentee with enrollment ${row[0]} not found.`);
                continue;
            }
            let id = mentee._id;
            console.log(id);
            console.log(mentee.mentors);
            let year = row[2];
            if (year.toLowerCase() === "fy") {
                mentee.mentors.fy = row[3];
            } else if (year.toLowerCase() === "sy") {
                mentee.mentors.sy = row[3];
            } else if (year.toLowerCase() === "ty") {
                mentee.mentors.ty = row[3];
            }

            const updatedmentors = mentee.mentors;
            mentee.mentors = updatedmentors;
            await mentee.save(); // Save the updated mentee document
            console.log(`Updated mentors for mentee ${id}`);
        }

        return NextResponse.json({ result: "Successfully inserted", status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ result: "Failed to allocate", status: 400 });
    }
}
