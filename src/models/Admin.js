const mongoose = require('mongoose')


const AdminSchema = new mongoose.Schema({
    name: { type: String, reqired: true },
    enrollment: { type: String, reqired: true },
    email: { type: String, reqired: true},
    password: { type: String, reqired: true },
    phone: { type: String,default:'' },

}, { timestamps: true })

mongoose.models = {}
export default mongoose.model("Admin", AdminSchema);