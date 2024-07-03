const mongoose = require('mongoose')


const MenteeSchema = new mongoose.Schema({
    enrollment: { type: String, reqired: true, unique: true },
    roll: { type: String, default:''},
    password: { type: String, reqired: true },
    address: { type: String, default:'' },
    mobile: { type: String,default:'' },
    department: { type: String,default:'' },
    year: { type: String,default:'' },
    name: { type: String,default:'' },
    fathername: { type: String,default:'' },
    fatherocc: { type: String,default:'' },
    mothername: { type: String,default:'' },
    motherocc: { type: String,default:'' },
    age: { type: String,default:'' },
    pincode: { type: String,default:'' },
    email: { type: String,default:'',unique:true },
    batch: { type: String,default:'' },
    mentors:{
            fy: { type: String,default:'-' },
            sy: { type: String,default:'-' },
            ty: { type: String,default:'-' },
        }
    ,
    academics:{
        semester1:{
            attendance: { type: String,default:'-' },
            percentage: { type: String,default:'-' },
            },
        semester2:{
            attendance: { type: String,default:'-' },
            percentage: { type: String,default:'-' },
            },
        semester3:{
            attendance: { type: String,default:'-' },
            percentage: { type: String,default:'-' },
            },     
        semester4:{
            attendance: { type: String,default:'-' },
            percentage: { type: String,default:'-' },
            },     
        semester5:{
            attendance: { type: String,default:'-' },
            percentage: { type: String,default:'-' },
            },     
        semester6:{
            attendance: { type: String,default:'-' },
            percentage: { type: String,default:'-' },
            },     
        },
    extraactivity:[
        { 
           eventname: { type: String,default:'' },
           eventplace: { type: String,default:'' },
           rank: { type: String,default:'' },
        },
   ],


}, { timestamps: true })

mongoose.models = {}
export default mongoose.model("Mentee", MenteeSchema);