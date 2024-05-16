//Get all user info
import clientPromise from "@/utils/mongodb"
import { ObjectId } from "mongodb";

export const GET = async (request, { params }) => {
    try {
        const db = await clientPromise;
        const collection = db.db("test").collection('empresa');
        
        //Turn params.id into a MongoDB ObjectId
        var o_id = new ObjectId(params.id);

        const empresa = await collection.find({ _id: o_id }).toArray().then((data) => {
            return data[0]
        });

        if (!empresa) {
            return new Response("Empresa not found", { status: 404 })
        }

        return new Response(JSON.stringify(empresa), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}