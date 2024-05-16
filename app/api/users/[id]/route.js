//Get all user info
import clientPromise from "@/utils/mongodb"
import { ObjectId } from "mongodb";

export const GET = async (request, { params }) => {
    try {
        const db = await clientPromise;
        const collection = db.db("test").collection('users');

        //Get the user info

        var o_id = new ObjectId(params.id);

        const user = await collection.find({ _id: o_id }).toArray().then((data) => {
            return data[0]
        });

        if (!user) {
            return new Response("User not found", { status: 404 })
        }

        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}