import mongoose from 'mongoose'



// const MONGODB_URI = "mongodb+srv://hrushitech51:@cluster0.y2hbeaz.mongodb.net/MentorWebApp";
// const MONGODB_URI = "mongodb+srv://hrushitech51:3ipbOzrzWwtqcanZ@cluster0.y2hbeaz.mongodb.net/MentorWebApp"
const MONGODB_URI = "mongodb+srv://hrushitech51:3ipbOzrzWwtqcanZ@cluster0.y2hbeaz.mongodb.net/MentorWebApp?retryWrites=true&w=majority&appName=Cluster0"
if (!MONGODB_URI) {
    throw new Error(
        "please define evn variable"
    )
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { con: null, promise: null }
}

const dbconnect = async () => {
    if (cached.conn) {
        return cached.conn;
    }


    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose
        })
    }


    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn
}


export default dbconnect;