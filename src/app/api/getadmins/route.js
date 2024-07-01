import Admin from "../../../models/Admin";
import connectDB from '../../../utils/mongoose';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectDB(); // Ensure this returns a promise that resolves when the connection is established
        
        const admins = await Admin.find();
        if (admins) {
            return NextResponse.json({ admins: admins, status: 200 });
        } else {
            return NextResponse.json({ message: "No Admins Found", status: 201 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Database error occurred", status: 400 });
    }
}
